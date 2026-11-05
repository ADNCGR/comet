CREATE TABLE IF NOT EXISTS public.site_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title JSONB NOT NULL DEFAULT '{}'::jsonb,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published site pages are public"
ON public.site_pages
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE OR REPLACE FUNCTION public.update_site_pages_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_site_pages_updated_at ON public.site_pages;
CREATE TRIGGER update_site_pages_updated_at
BEFORE UPDATE ON public.site_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_site_pages_updated_at();

INSERT INTO public.site_pages (slug, title, content, is_published)
VALUES (
  'home',
  '{"ar":"الرئيسية","fr":"Accueil","en":"Home"}'::jsonb,
  '{
    "heroSlides": [
      {
        "eyebrow": {"ar":"خبرة، تكنولوجيا، أمان","fr":"Experience, technologie, securite","en":"Experience, technology, safety"},
        "title": {"ar":"حلول الرفع المهني","fr":"Solutions d elevation professionnelles","en":"Professional elevation solutions"},
        "subtitle": {"ar":"منصات جوية على الشاحنات والبيك آب مهيأة للسوق المغربي.","fr":"Nacelles sur camion et pick-up adaptees au marche marocain.","en":"Truck and pick-up mounted aerial platforms adapted for Morocco."},
        "cta": {"ar":"اكتشف المنتجات","fr":"Decouvrir les produits","en":"Discover products"},
        "href":"/piattaforme-aeree",
        "image":"https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-eurosky-hd.jpg"
      }
    ],
    "metrics": [
      {"value":80,"suffix":"+","label":{"ar":"نموذج متاح","fr":"Modeles disponibles","en":"Available models"}},
      {"value":12,"suffix":"+","label":{"ar":"قطاعات مهنية","fr":"Secteurs professionnels","en":"Professional sectors"}},
      {"value":24,"suffix":"h","label":{"ar":"متابعة الطلبات","fr":"Suivi des demandes","en":"Request follow-up"}},
      {"value":100,"suffix":"%","label":{"ar":"مواكبة محلية","fr":"Accompagnement local","en":"Local support"}}
    ]
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    content = public.site_pages.content || EXCLUDED.content,
    is_published = EXCLUDED.is_published;
