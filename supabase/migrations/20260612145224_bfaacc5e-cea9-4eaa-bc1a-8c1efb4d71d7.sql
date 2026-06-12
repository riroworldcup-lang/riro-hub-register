
-- gallery_images
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- competitions
CREATE TABLE public.competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  levels text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.competitions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.competitions TO authenticated;
GRANT ALL ON public.competitions TO service_role;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads competitions" ON public.competitions FOR SELECT USING (true);
CREATE POLICY "Admins manage competitions" ON public.competitions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER trg_gallery_touch BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_competitions_touch BEFORE UPDATE ON public.competitions
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed competitions
INSERT INTO public.competitions (name, category, description, levels, sort_order) VALUES
('Chakravyuh','Robotics','Navigate the autonomous maze gauntlet.','{}',10),
('Innovation Challenge','Innovation','Showcase original STEM solutions.','{Junior,Senior}',20),
('Sumo Bot','Robotics','High-torque combat in the ring.','{}',30),
('Robo Soccer','Robotics','Tactical robotic football matches.','{Junior,Senior}',40),
('Robo Race','Robotics','Line-following speed circuits.','{Junior,Senior}',50),
('Assembly Robot Race','Robotics','Build, then race against the clock.','{Junior}',60),
('Water Rocket','Aerospace','Pressure propulsion altitude trials.','{Junior,Senior}',70),
('Drone Racing','Aerospace','FPV racing through obstacle gates.','{}',80),
('Robo Hockey','Robotics','Multi-bot team strategy on ice.','{Junior,Senior}',90),
('Aero Modeling Challenge','Aerospace','Custom fixed-wing precision flight.','{Junior,Senior}',100),
('FPV Car Racing','Robotics','First-person view ground racing.','{Junior,Senior}',110),
('Aeromodelling Racing','Aerospace','RC aircraft head-to-head time trials.','{Junior,Senior}',120),
('Web / IT Technology','Innovation','Web dev sprint and code battles.','{}',130),
('ROBOWAR','Robotics','Full-contact mechanical combat.','{Junior,Senior}',140),
('Reel Making Challenge','Media','Short-form video storytelling.','{}',150),
('BGMI Championship','Gaming','Squad-based mobile esports battle.','{}',160),
('Amateur Astronomer Conference','STEM','Present celestial research findings.','{}',170);
