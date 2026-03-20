
DROP POLICY "Service role can insert purchases" ON public.purchases;

CREATE POLICY "Service role can insert purchases"
  ON public.purchases FOR INSERT
  TO service_role
  WITH CHECK (true);
