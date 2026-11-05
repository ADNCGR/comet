import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type LangText = { fr: string; en: string; ar: string };
type SpecItem = { label: LangText; value: LangText };
type StockPage = {
  id: string;
  slug: string;
  title: LangText;
  content: {
    kind: "stock";
    status: "in_stock" | "pre_owned";
    title: LangText;
    eyebrow: LangText;
    description: LangText;
    image: string;
    image2?: string;
    specs?: SpecItem[];
    details?: SpecItem[];
  };
  is_published: boolean;
};

const emptyLang = (): LangText => ({ fr: "", en: "", ar: "" });
const emptySpec = (): SpecItem => ({ label: emptyLang(), value: emptyLang() });

const fallbackInStock: StockPage[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "aerial-platform-in-stock-new-eurosky-18-2-7-5-hq",
    title: { fr: "NEW EUROSKY 18-2-7.5 HQ", en: "NEW EUROSKY 18-2-7.5 HQ", ar: "NEW EUROSKY 18-2-7.5 HQ" },
    is_published: true,
    content: {
      kind: "stock",
      status: "in_stock",
      title: { fr: "NEW EUROSKY 18-2-7.5 HQ", en: "NEW EUROSKY 18-2-7.5 HQ", ar: "NEW EUROSKY 18-2-7.5 HQ" },
      eyebrow: { fr: "Piattaforma Aerea IN STOCK", en: "Aerial Platform IN STOCK", ar: "Aerial Platform IN STOCK" },
      description: { fr: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)", en: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)", ar: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)" },
      image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Eurosky-18-Iveco-Daily-1-1-scaled.jpg",
      image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Eurosky-18-Iveco-Daily-1-1-scaled.jpg",
      specs: [],
      details: [],
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111112",
    slug: "aerial-platform-in-stock-new-eurosfilo-17-2-9-11-hq",
    title: { fr: "NEW EUROSFILO 17-2-9(11) HQ", en: "NEW EUROSFILO 17-2-9(11) HQ", ar: "NEW EUROSFILO 17-2-9(11) HQ" },
    is_published: true,
    content: {
      kind: "stock",
      status: "in_stock",
      title: { fr: "NEW EUROSFILO 17-2-9(11) HQ", en: "NEW EUROSFILO 17-2-9(11) HQ", ar: "NEW EUROSFILO 17-2-9(11) HQ" },
      eyebrow: { fr: "Piattaforma Aerea IN STOCK", en: "Aerial Platform IN STOCK", ar: "Aerial Platform IN STOCK" },
      description: { fr: "KIT (A) with standard subframe\nIN STOCK", en: "KIT (A) with standard subframe\nIN STOCK", ar: "KIT (A) with standard subframe\nIN STOCK" },
      image: "https://www.officinecomet.com/wp-content/uploads/2025/09/3S4D6359-scaled.jpg",
      image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/3S4D6359-scaled.jpg",
      specs: [],
      details: [],
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111113",
    slug: "aerial-platform-in-stock-new-eurosfilo-22-2-12-15-hq",
    title: { fr: "NEW EUROSFILO 22-2-12(15) HQ", en: "NEW EUROSFILO 22-2-12(15) HQ", ar: "NEW EUROSFILO 22-2-12(15) HQ" },
    is_published: true,
    content: {
      kind: "stock",
      status: "in_stock",
      title: { fr: "NEW EUROSFILO 22-2-12(15) HQ", en: "NEW EUROSFILO 22-2-12(15) HQ", ar: "NEW EUROSFILO 22-2-12(15) HQ" },
      eyebrow: { fr: "Piattaforma Aerea IN STOCK", en: "Aerial Platform IN STOCK", ar: "Aerial Platform IN STOCK" },
      description: { fr: "KIT (B)\nIN STOCK", en: "KIT (B)\nIN STOCK", ar: "KIT (B)\nIN STOCK" },
      image: "https://www.officinecomet.com/wp-content/uploads/2025/09/KIT-B-ESEMPIO.jpg",
      image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/KIT-B-ESEMPIO.jpg",
      specs: [],
      details: [],
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111114",
    slug: "aerial-platform-in-stock-new-eurosky-21-2-7-9-hq",
    title: { fr: "NEW EUROSKY 21-2-7(9) HQ", en: "NEW EUROSKY 21-2-7(9) HQ", ar: "NEW EUROSKY 21-2-7(9) HQ" },
    is_published: true,
    content: {
      kind: "stock",
      status: "in_stock",
      title: { fr: "NEW EUROSKY 21-2-7(9) HQ", en: "NEW EUROSKY 21-2-7(9) HQ", ar: "NEW EUROSKY 21-2-7(9) HQ" },
      eyebrow: { fr: "Piattaforma Aerea IN STOCK", en: "Aerial Platform IN STOCK", ar: "Aerial Platform IN STOCK" },
      description: { fr: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)", en: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)", ar: "Aerial Platform IN STOCK\nvehicle IVECO DAILY 35S14H P3450 (E6E)" },
      image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Image1.jpg",
      image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Image1.jpg",
      specs: [],
      details: [],
    },
  },
];

const fallbackPreOwned: StockPage[] = [
  {
    id: "22222222-2222-4222-8222-222222222221",
    slug: "aerial-platform-pre-owned-new-eurosfilo-17-2-7-8-5-hq",
    title: { fr: "NEW EUROSFILO 17/2/7(8.5) HQ", en: "NEW EUROSFILO 17/2/7(8.5) HQ", ar: "NEW EUROSFILO 17/2/7(8.5) HQ" },
    is_published: true,
    content: {
      kind: "stock",
      status: "pre_owned",
      title: { fr: "NEW EUROSFILO 17/2/7(8.5) HQ", en: "NEW EUROSFILO 17/2/7(8.5) HQ", ar: "NEW EUROSFILO 17/2/7(8.5) HQ" },
      eyebrow: { fr: "Piattaforma Aerea USATO", en: "Aerial Platform PRE OWNED", ar: "Aerial Platform PRE OWNED" },
      description: { fr: "Aerial Platform PRE OWNED\nvehicle IVECO DAILY 35", en: "Aerial Platform PRE OWNED\nvehicle IVECO DAILY 35", ar: "Aerial Platform PRE OWNED\nvehicle IVECO DAILY 35" },
      image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Foto-Usato_7-1.jpg",
      image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Foto-Usato_7-1.jpg",
      specs: [],
      details: [],
    },
  },
];

const normalize = (page: StockPage): StockPage => ({
  ...page,
  content: {
    ...page.content,
    specs: page.content.specs ?? [],
    details: page.content.details ?? [],
  },
});

const makeNewPage = (status: "in_stock" | "pre_owned"): StockPage => ({
  id: crypto.randomUUID(),
  slug: "",
  is_published: true,
  title: emptyLang(),
  content: {
    kind: "stock",
    status,
    title: emptyLang(),
    eyebrow: emptyLang(),
    description: emptyLang(),
    image: "",
    image2: "",
    specs: [emptySpec()],
    details: [emptySpec()],
  },
});

export default function AdminInventory() {
  const supabaseReady = Boolean(supabase);
  const [sessionReady, setSessionReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<StockPage[]>([]);
  const [activeStatus, setActiveStatus] = useState<"in_stock" | "pre_owned">("in_stock");
  const [draft, setDraft] = useState<StockPage>(makeNewPage("in_stock"));
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState<"image" | "image2" | null>(null);

  const filteredPages = useMemo(
    () => pages.filter((page) => page.content.status === activeStatus),
    [pages, activeStatus]
  );

  const visibleItems = useMemo(() => {
    const fallback = activeStatus === "in_stock" ? fallbackInStock : fallbackPreOwned;
    const combined = [...fallback, ...filteredPages];
    const bySlug = new Map<string, StockPage>();
    combined.forEach((page) => bySlug.set(page.slug, page));
    return Array.from(bySlug.values()).filter((page) => page.content.status === activeStatus);
  }, [filteredPages, activeStatus]);

  const syncDraftFromPage = (page: StockPage) => {
    setActiveStatus(page.content.status);
    setSelectedPageId(page.id);
    setDraft(page);
  };

  useEffect(() => {
    if (!supabaseReady) {
      setSessionReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(Boolean(data.session));
      setSessionReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
      setSessionReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabaseReady]);

  useEffect(() => {
    if (!supabaseReady) return;
    if (!isAuthed) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_pages")
        .select("id, slug, title, content, is_published")
        .eq("content->>kind", "stock")
        .order("updated_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      } else {
        setPages((data ?? []).map((row) => normalize(row as StockPage)));
      }
      setLoading(false);
    })();
  }, [isAuthed, supabaseReady]);

  const signIn = async () => {
    if (!supabaseReady) {
      toast.error("Supabase is not configured for this deployment.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Admin session ready");
  };

  const signOut = async () => {
    if (!supabaseReady) return;
    await supabase.auth.signOut();
  };

  const uploadImage = async (file: File, field: "image" | "image2") => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const folder = import.meta.env.VITE_CLOUDINARY_FOLDER ?? "inventory";

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    try {
      setImageUploading(field);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Cloudinary upload failed: ${errorText}`);
        return;
      }

      const data = await response.json();
      const secureUrl = typeof data.secure_url === "string" ? data.secure_url : "";
      if (!secureUrl) {
        toast.error("Cloudinary did not return an image URL");
        return;
      }
      setDraft((current) => ({ ...current, content: { ...current.content, [field]: secureUrl } }));
      toast.success("Image uploaded");
    } finally {
      setImageUploading(null);
    }
  };

  const updateLang = (path: keyof LangText, value: string, target: "title" | "eyebrow" | "description" | "pageTitle" | "specLabel" | "specValue", index?: number) => {
    setDraft((current) => {
      const next = structuredClone(current);
      if (target === "pageTitle") next.title[path] = value;
      else if (target === "title") next.content.title[path] = value;
      else if (target === "eyebrow") next.content.eyebrow[path] = value;
      else if (target === "description") next.content.description[path] = value;
      else if (index !== undefined && target === "specLabel") next.content.specs![index].label[path] = value;
      else if (index !== undefined && target === "specValue") next.content.specs![index].value[path] = value;
      return next;
    });
  };

  const savePage = async () => {
    if (!draft.slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    if (!draft.content.image.trim()) {
      toast.error("Main image is required");
      return;
    }
    if (imageUploading) {
      toast.error("Please wait for the image upload to finish");
      return;
    }
    const payload = {
      id: draft.id,
      slug: draft.slug.trim(),
      title: draft.title,
      content: draft.content,
      is_published: draft.is_published,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("site_pages").upsert(payload, { onConflict: "id" });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    setPages((current) => {
      const next = { ...draft, id: draft.id };
      const index = current.findIndex((page) => page.id === draft.id);
      if (index >= 0) {
        const copy = [...current];
        copy[index] = next;
        return copy;
      }
      return [next, ...current];
    });
    setSelectedPageId(draft.id);
  };

  const removePage = async (page: StockPage) => {
    setDeleteLoadingId(page.id);
    const { error } = await supabase.from("site_pages").delete().eq("id", page.id);
    if (error) {
      toast.error(error.message);
      setDeleteLoadingId(null);
      return;
    }
    toast.success("Deleted");
    setPages((current) => current.filter((item) => item.id !== page.id));
    if (selectedPageId === page.id) {
      const next = makeNewPage(page.content.status);
      setSelectedPageId(null);
      setActiveStatus(page.content.status);
      setDraft(next);
    }
    setDeleteLoadingId(null);
  };

  if (!sessionReady) return null;
  if (!supabaseReady) {
    return (
      <div className="min-h-screen bg-white font-[Arial,sans-serif] text-[#2a2f35]">
        <Header />
        <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl items-center px-6 py-16">
          <Card className="w-full border-0 bg-white shadow-none">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-[22px] font-normal uppercase text-[#2a2f35]">
                Admin inventory unavailable
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-[14px] leading-[1.7] text-[#555]">
                The admin portal is deployed, but the Supabase environment variables are not configured on this Netlify build.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-white font-[Arial,sans-serif] text-[#2a2f35]">
        <Header />
        <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-md items-center px-6 py-16">
          <Card className="w-full border-0 bg-white shadow-none">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-[22px] font-normal uppercase text-[#2a2f35]">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="grid gap-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="off"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="new-password"
                  spellCheck={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white"
                />
              </div>
              <Button onClick={signIn} className="w-full">
                Sign in
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-[Arial,sans-serif] text-[#2a2f35]">
      <Header />
      <main>
        <section className="h-[118px] bg-[#909090]">
          <div className="mx-auto flex h-full max-w-[1080px] items-center px-10">
            <h1 className="text-[27px] font-normal uppercase text-white">PRE-OWNED & IN-STOCK ADMIN</h1>
          </div>
        </section>

        <div className="border-b border-[#ededed]">
          <div className="mx-auto max-w-[1080px] px-10 py-[11px] text-[12px] text-[#555]">
            <Link to="/" className="hover:text-[#fbbe3f]">CO.ME.T. Officine | Piattaforme Aeree</Link>
            <span className="px-2 text-[#999]">&gt;</span>
            <span className="text-[#888]">Admin inventory</span>
          </div>
        </div>

        <section className="mx-auto max-w-[1080px] px-10 py-[28px] pb-[42px]">
          <section className="mb-[30px] rounded-[4px] bg-[#f6f6f6] px-6 py-[26px] flex items-center justify-between gap-4">
            <div>
              <h2 className="m-0 text-[22px] font-normal uppercase text-[#2a2f35]">
                {activeStatus === "in_stock" ? "MODELS IN STOCK" : "MODEL PRE OWNED"}
              </h2>
              <p className="mt-2 text-[12px] text-[#666]">
                {selectedPageId ? `Editing: ${draft.slug || draft.id}` : "Create a new item or select an existing one to edit."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-[#ddd] bg-white text-[#2a2f35]" onClick={() => { setSelectedPageId(null); setActiveStatus("in_stock"); setDraft(makeNewPage("in_stock")); }}>
                In stock
              </Button>
              <Button variant="outline" className="border-[#ddd] bg-white text-[#2a2f35]" onClick={() => { setSelectedPageId(null); setActiveStatus("pre_owned"); setDraft(makeNewPage("pre_owned")); }}>
                Pre-owned
              </Button>
              <Button className="bg-[#ff716c] text-white hover:bg-[#ee5e59]" onClick={savePage}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button variant="outline" className="border-[#ddd] bg-white text-[#2a2f35]" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </div>
          </section>

          {loading ? (
            <div className="flex items-center gap-2 py-10 text-[#666]"><Loader2 className="h-4 w-4 animate-spin" /> Loading inventory...</div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
                {visibleItems.map((page) => (
                  <article key={page.id} className="grid grid-cols-1 gap-5 md:grid-cols-[236px_1fr] md:gap-7 md:items-start rounded-[4px] border border-transparent hover:border-[#f0f0f0] transition-colors">
                    <Link to="#" onClick={(e) => { e.preventDefault(); syncDraftFromPage(page); }} className="group block h-[236px] overflow-hidden bg-[#f4f4f4] md:h-[192px]">
                      <img src={page.content.image} alt={page.content.title.en || page.slug} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    </Link>
                    <div className="pt-[2px]">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className={page.content.status === "in_stock" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                          {page.content.status === "in_stock" ? "IN STOCK" : "PRE OWNED"}
                        </Badge>
                        {page.is_published ? (
                          <span className="text-[11px] uppercase text-emerald-600">Published</span>
                        ) : (
                          <span className="text-[11px] uppercase text-[#999]">Draft</span>
                        )}
                      </div>
                      <h2 className="mb-4 text-[14px] font-bold leading-tight text-[#333] uppercase">
                        <button type="button" onClick={() => syncDraftFromPage(page)} className="text-left hover:text-[#fbbe3f]">
                          {page.content.title.en || page.slug}
                        </button>
                      </h2>
                      <p className="mb-6 whitespace-pre-line text-[13px] leading-[1.7] text-[#444]">
                        {page.content.description.en || "No description"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button className="rounded-[4px] bg-[#ff716c] px-4 py-[10px] text-[10px] font-bold uppercase text-white hover:bg-[#ee5e59]" onClick={() => syncDraftFromPage(page)}>
                          Edit
                        </Button>
                        <Button variant="outline" className="rounded-[4px] border-[#ddd] bg-white px-4 py-[10px] text-[10px] font-bold uppercase text-[#2a2f35]" onClick={() => removePage(page)} disabled={deleteLoadingId === page.id}>
                          {deleteLoadingId === page.id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <section className="mb-[30px] mt-[34px] rounded-[4px] bg-[#f6f6f6] px-6 py-[26px]">
                <h2 className="m-0 text-[22px] font-normal uppercase text-[#2a2f35]">EDITOR</h2>
              </section>

              <Card className="border-0 bg-white shadow-none">
                <CardContent className="space-y-6 px-0">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2 md:col-span-2">
                      <Label>Slug</Label>
                      <Input value={draft.slug} onChange={(e) => setDraft((current) => ({ ...current, slug: e.target.value }))} className="bg-white" />
                    </div>
                    <div className="flex items-end justify-between rounded-lg border border-[#ededed] p-4">
                      <div>
                        <div className="text-sm font-medium">Published</div>
                        <div className="text-xs text-[#777]">Visible on public page</div>
                      </div>
                      <Switch checked={draft.is_published} onCheckedChange={(checked) => setDraft((current) => ({ ...current, is_published: checked }))} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {(["fr", "en", "ar"] as const).map((lang) => (
                      <div key={lang} className="grid gap-2">
                        <Label>Title {lang.toUpperCase()}</Label>
                        <Input value={draft.content.title[lang]} onChange={(e) => updateLang(lang, e.target.value, "title")} className="bg-white" />
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {(["fr", "en", "ar"] as const).map((lang) => (
                      <div key={lang} className="grid gap-2">
                        <Label>Eyebrow {lang.toUpperCase()}</Label>
                        <Input value={draft.content.eyebrow[lang]} onChange={(e) => updateLang(lang, e.target.value, "eyebrow")} className="bg-white" />
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      {(["fr", "en", "ar"] as const).map((lang) => (
                        <Textarea key={lang} value={draft.content.description[lang]} onChange={(e) => updateLang(lang, e.target.value, "description")} className="min-h-32 bg-white" />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label>Main image</Label>
                      <Input value={draft.content.image} onChange={(e) => setDraft((current) => ({ ...current, content: { ...current.content, image: e.target.value } }))} className="bg-white" />
                      <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "image")} className="bg-white" />
                      {imageUploading === "image" && <p className="text-xs text-[#777]">Uploading main image...</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label>Second image</Label>
                      <Input value={draft.content.image2 ?? ""} onChange={(e) => setDraft((current) => ({ ...current, content: { ...current.content, image2: e.target.value } }))} className="bg-white" />
                      <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "image2")} className="bg-white" />
                      {imageUploading === "image2" && <p className="text-xs text-[#777]">Uploading second image...</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[#ff716c] text-white hover:bg-[#ee5e59]" onClick={savePage} disabled={Boolean(imageUploading)}>
                      <Save className="mr-2 h-4 w-4" /> Save changes
                    </Button>
                    <Button variant="outline" className="border-[#ddd] bg-white text-[#2a2f35]" onClick={() => setDraft(makeNewPage(activeStatus))}>
                      <Plus className="mr-2 h-4 w-4" /> New item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
