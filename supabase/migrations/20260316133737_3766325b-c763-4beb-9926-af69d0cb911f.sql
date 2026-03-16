
CREATE TABLE public.saved_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('lesson', 'worksheet', 'quiz', 'exit_ticket')),
  grade_level TEXT,
  subject TEXT,
  topic TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resources"
  ON public.saved_resources FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resources"
  ON public.saved_resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resources"
  ON public.saved_resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resources"
  ON public.saved_resources FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_saved_resources_user_id ON public.saved_resources(user_id);
CREATE INDEX idx_saved_resources_type ON public.saved_resources(resource_type);
