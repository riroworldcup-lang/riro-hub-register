
-- 1) Lock down SECURITY DEFINER helper: remove PUBLIC/anon EXECUTE.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2) Add ownership to visitor_registrations
ALTER TABLE public.visitor_registrations
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS visitor_registrations_user_id_idx
  ON public.visitor_registrations(user_id);

-- 3) Drop the always-true public INSERT policy
DROP POLICY IF EXISTS "Anyone can submit visitor registration" ON public.visitor_registrations;

-- 4) Restrict inserts to authenticated users linking to themselves
CREATE POLICY "Authenticated users submit own visitor registration"
  ON public.visitor_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5) Let users read their own visitor registration
CREATE POLICY "Users view own visitor registration"
  ON public.visitor_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::public.app_role));

-- Ensure anon has no privileges to write, even by mistake
REVOKE INSERT, UPDATE, DELETE ON public.visitor_registrations FROM anon;
