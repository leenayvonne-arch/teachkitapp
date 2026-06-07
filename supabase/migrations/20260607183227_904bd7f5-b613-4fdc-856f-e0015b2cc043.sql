CREATE TABLE IF NOT EXISTS public.product_files (
  product_id uuid PRIMARY KEY REFERENCES public.products(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_files TO authenticated;
GRANT ALL ON public.product_files TO service_role;

ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage product files metadata" ON public.product_files;
CREATE POLICY "Admins can manage product files metadata"
  ON public.product_files
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

INSERT INTO public.product_files (product_id, file_path)
SELECT id, file_path FROM public.products
WHERE file_path IS NOT NULL AND file_path <> ''
ON CONFLICT (product_id) DO NOTHING;

-- Replace storage policy that referenced products.file_path
DROP POLICY IF EXISTS "Purchasers can download product files" ON storage.objects;
CREATE POLICY "Purchasers can download product files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'product-files'
    AND EXISTS (
      SELECT 1
      FROM public.purchases p
      JOIN public.products pr ON pr.slug = p.product_slug
      JOIN public.product_files pf ON pf.product_id = pr.id
      WHERE p.user_id = auth.uid()
        AND pf.file_path = storage.objects.name
    )
  );

ALTER TABLE public.products DROP COLUMN IF EXISTS file_path;