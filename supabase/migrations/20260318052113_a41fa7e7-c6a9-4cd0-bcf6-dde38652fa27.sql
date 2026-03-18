
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text,
  grade_level text NOT NULL,
  message text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can insert feedback
CREATE POLICY "Authenticated users can submit feedback"
  ON public.feedback FOR INSERT TO authenticated
  WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON public.feedback FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Allow public read of featured feedback for testimonials
CREATE POLICY "Anyone can view featured feedback"
  ON public.feedback FOR SELECT TO anon, authenticated
  USING (featured = true);
