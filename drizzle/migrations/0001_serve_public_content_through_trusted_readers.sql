-- These records are public-facing site content, but direct Data API access is unnecessary:
-- the app's public server functions serve the same content through trusted readers.
DROP POLICY IF EXISTS "Authenticated users read team members" ON public.team_members;
DROP POLICY IF EXISTS "Authenticated users read competitions" ON public.competitions;
DROP POLICY IF EXISTS "Authenticated users read gallery" ON public.gallery_images;
REVOKE SELECT ON public.team_members FROM anon, authenticated;
REVOKE SELECT ON public.competitions FROM anon, authenticated;
REVOKE SELECT ON public.gallery_images FROM anon, authenticated;