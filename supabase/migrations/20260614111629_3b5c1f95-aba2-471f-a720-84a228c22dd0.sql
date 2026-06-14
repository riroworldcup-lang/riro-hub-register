
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
DECLARE i int;
BEGIN
  FOR i IN 1..10 LOOP
    EXECUTE format('ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS team_mate_%s_name text', i);
    EXECUTE format('ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS team_mate_%s_contact text', i);
  END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS registrations_user_id_idx ON public.registrations(user_id);

DROP TRIGGER IF EXISTS registrations_touch_updated_at ON public.registrations;
CREATE TRIGGER registrations_touch_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Replace permissive insert policy with an authenticated-only one tied to user_id
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;

CREATE POLICY "Authenticated users insert own registration"
  ON public.registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users update own registrations"
  ON public.registrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));
