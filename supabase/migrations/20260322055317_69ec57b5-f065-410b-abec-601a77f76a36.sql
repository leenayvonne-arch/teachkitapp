
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS generations_used integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS generations_reset_at timestamp with time zone NOT NULL DEFAULT now();
