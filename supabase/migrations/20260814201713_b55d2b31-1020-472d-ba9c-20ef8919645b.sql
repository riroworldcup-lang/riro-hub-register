ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS team_size text;

COMMENT ON COLUMN public.registrations.team_size IS 'Team size selected by participant during registration.';