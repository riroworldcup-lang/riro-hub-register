-- Allow public site content to remain visible through the existing server-rendered readers,
-- while requiring a signed-in user for direct Data API reads.
DROP POLICY IF EXISTS "Team members public read" ON public.team_members;
CREATE POLICY "Authenticated users read team members"
  ON public.team_members FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone reads competitions" ON public.competitions;
CREATE POLICY "Authenticated users read competitions"
  ON public.competitions FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone reads gallery" ON public.gallery_images;
CREATE POLICY "Authenticated users read gallery"
  ON public.gallery_images FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Only the registration charge notice is intended for public display.
DROP POLICY IF EXISTS "Anyone reads settings" ON public.app_settings;
CREATE POLICY "Anyone reads registration charge settings"
  ON public.app_settings FOR SELECT TO anon, authenticated
  USING (key = 'registration_charges');

-- A caller may only check their own role; admin policies continue to work because
-- they pass auth.uid() as the role subject.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT auth.uid() = _user_id AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = _role
  )
$function$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;