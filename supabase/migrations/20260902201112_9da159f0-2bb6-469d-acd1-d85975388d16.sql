DELETE FROM public.team_members t
USING public.team_members k
WHERE t.image_url = k.image_url
  AND t.created_at > k.created_at;