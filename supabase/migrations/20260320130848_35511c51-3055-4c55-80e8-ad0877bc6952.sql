
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admins can manage product files"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'product-files' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'product-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Purchasers can download product files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'product-files'
  AND EXISTS (
    SELECT 1 FROM public.purchases p
    JOIN public.products pr ON pr.slug = p.product_slug
    WHERE p.user_id = auth.uid()
    AND pr.file_path = storage.objects.name
  )
);
