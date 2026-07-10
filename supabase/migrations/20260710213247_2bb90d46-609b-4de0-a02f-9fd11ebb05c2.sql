
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS registration_number text UNIQUE;

CREATE OR REPLACE FUNCTION public.assign_registration_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  candidate text;
  attempts int := 0;
BEGIN
  IF NEW.registration_number IS NOT NULL AND NEW.registration_number <> '' THEN
    RETURN NEW;
  END IF;
  LOOP
    candidate := 'RIRO-WC26-' ||
      lpad((floor(random() * 100000))::int::text, 5, '0') ||
      substr(md5(random()::text || clock_timestamp()::text), 1, 3);
    candidate := upper(candidate);
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.registrations WHERE registration_number = candidate);
    attempts := attempts + 1;
    IF attempts > 8 THEN EXIT; END IF;
  END LOOP;
  NEW.registration_number := candidate;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_assign_registration_number ON public.registrations;
CREATE TRIGGER trg_assign_registration_number
BEFORE INSERT ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.assign_registration_number();

UPDATE public.registrations
SET registration_number = 'RIRO-WC26-' || lpad((floor(random()*100000))::int::text,5,'0') || upper(substr(md5(id::text),1,3))
WHERE registration_number IS NULL;
