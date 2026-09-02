DELETE FROM public.team_members
WHERE id IN (
  SELECT id FROM (
    SELECT id, row_number() OVER (PARTITION BY image_url ORDER BY created_at, id) rn
    FROM public.team_members
  ) s WHERE rn > 1
);