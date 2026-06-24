
CREATE TABLE public.visitor_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  contact_number text NOT NULL,
  address_line_1 text,
  address_line_2 text,
  address_line_3 text,
  address_line_4 text,
  father_name text,
  father_mobile text,
  mother_name text,
  mother_mobile text,
  standard text,
  division text,
  school_college_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.visitor_registrations TO authenticated;
GRANT INSERT ON public.visitor_registrations TO anon;
GRANT ALL ON public.visitor_registrations TO service_role;

ALTER TABLE public.visitor_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit visitor registration"
  ON public.visitor_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view visitor registrations"
  ON public.visitor_registrations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update visitor registrations"
  ON public.visitor_registrations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete visitor registrations"
  ON public.visitor_registrations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_visitor_registrations_updated_at
  BEFORE UPDATE ON public.visitor_registrations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
