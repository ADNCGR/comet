import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { defaultHomepageContent, type HomepageContent } from "@/data/homepageContent";

type ContentStatus = "loading" | "ready" | "fallback";

const mergeHomepageContent = (data: Partial<HomepageContent> | null): HomepageContent => {
  const merged = {
    ...defaultHomepageContent,
    ...(data || {}),
  };

  if (!merged.heroSlides || merged.heroSlides.length <= 1) {
    merged.heroSlides = defaultHomepageContent.heroSlides;
  }

  return merged;
};

const isHomepageContentPatch = (content: Json | undefined): content is Partial<HomepageContent> =>
  Boolean(content && typeof content === "object" && !Array.isArray(content));

export const useHomepageContent = () => {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [status, setStatus] = useState<ContentStatus>("loading");
  const supabaseReady = Boolean(supabase);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      if (!supabaseReady) {
        setContent(defaultHomepageContent);
        setStatus("fallback");
        return;
      }
      try {
        const { data, error } = await supabase
          .from("site_pages")
          .select("content")
          .eq("slug", "home")
          .eq("is_published", true)
          .maybeSingle();

        if (error) throw error;

        if (!mounted) return;
        const contentPatch = isHomepageContentPatch(data?.content) ? data.content : null;
        setContent(mergeHomepageContent(contentPatch));
        setStatus(contentPatch ? "ready" : "fallback");
      } catch (error) {
        console.warn("Using fallback homepage content:", error);
        if (!mounted) return;
        setContent(defaultHomepageContent);
        setStatus("fallback");
      }
    };

    loadContent();

    return () => {
      mounted = false;
    };
  }, [supabaseReady]);

  return { content, status };
};
