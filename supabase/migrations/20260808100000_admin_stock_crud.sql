-- Restore a lightweight admin model for inventory management
CREATE TYPE IF NOT EXISTS public.app_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Published site pages are public" ON public.site_pages;
DROP POLICY IF EXISTS "Admins can manage site pages" ON public.site_pages;

CREATE POLICY "Published site pages are public"
ON public.site_pages
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Admins can manage site pages"
ON public.site_pages
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM storage.buckets
    WHERE id = 'stock-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('stock-images', 'stock-images', true);
  END IF;
END $$;

DROP POLICY IF EXISTS "Public read stock images" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload stock images" ON storage.objects;
DROP POLICY IF EXISTS "Admins update stock images" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete stock images" ON storage.objects;

CREATE POLICY "Public read stock images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'stock-images');

CREATE POLICY "Admins upload stock images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'stock-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update stock images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'stock-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'stock-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete stock images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'stock-images' AND public.has_role(auth.uid(), 'admin'));
