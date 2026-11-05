WITH product_roots (slug) AS (
  VALUES ('products'), ('produits')
),
prepared_pages AS (
  SELECT
    slug,
    jsonb_build_object(
      'fr', 'Nacelles COMET au Maroc',
      'en', 'COMET aerial platforms in Morocco',
      'ar', 'رافعات COMET في المغرب'
    ) AS title,
    jsonb_build_object(
      'title', jsonb_build_object(
        'fr', 'Nacelles COMET au Maroc',
        'en', 'COMET aerial platforms in Morocco',
        'ar', 'رافعات COMET في المغرب'
      ),
      'eyebrow', jsonb_build_object(
        'fr', 'Catalogue Maroc',
        'en', 'Morocco catalog',
        'ar', 'كتالوج المغرب'
      ),
      'description', jsonb_build_object(
        'fr', 'Gammes pick-up, van, camion et solutions speciales avec conseil local, validation chassis, formation et service apres-vente au Maroc.',
        'en', 'Pick-up, van, truck and special ranges with local guidance, chassis validation, training, and after-sales service in Morocco.',
        'ar', 'فئات البيك آب والفان والشاحنات والحلول الخاصة مع استشارة محلية وفحص الشاسيه والتكوين وخدمة ما بعد البيع في المغرب.'
      ),
      'image', 'https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-eurosky-hd.jpg',
      'kind', 'page',
      'body', jsonb_build_array(
        jsonb_build_object(
          'fr', 'Le catalogue est alimente par Supabase et reste disponible en francais, anglais et arabe, avec des routes detaillees pour chaque gamme et chaque modele.',
          'en', 'The catalog is powered by Supabase and remains available in French, English, and Arabic, with routed detail pages for every range and model.',
          'ar', 'يعتمد الكتالوج على Supabase ويبقى متاحا بالفرنسية والانجليزية والعربية مع صفحات موجهة لكل فئة وكل نموذج.'
        ),
        jsonb_build_object(
          'fr', 'Les donnees sont adaptees au marche marocain : disponibilite commerciale, compatibilite vehicule, contraintes de chantier, formation et service local.',
          'en', 'The data is adapted to Morocco: commercial availability, vehicle compatibility, site constraints, training, and local service.',
          'ar', 'البيانات مهيأة للسوق المغربي: التوفر التجاري وتوافق المركبة وظروف الورش والتكوين والخدمة المحلية.'
        )
      )
    ) AS content
  FROM product_roots
)
INSERT INTO public.site_pages (slug, title, content, is_published)
SELECT slug, title, content, true
FROM prepared_pages
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    content = public.site_pages.content || EXCLUDED.content,
    is_published = true,
    updated_at = now();
