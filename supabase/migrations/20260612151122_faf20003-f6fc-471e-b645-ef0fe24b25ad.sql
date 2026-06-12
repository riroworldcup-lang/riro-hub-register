-- Add image_url to competitions
ALTER TABLE public.competitions ADD COLUMN image_url text;
GRANT SELECT ON public.competitions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.competitions TO authenticated;
GRANT ALL ON public.competitions TO service_role;

-- Seed demo gallery images
INSERT INTO public.gallery_images (image_url, caption, sort_order) VALUES
('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80', 'Students building robots at RIRO 2026', 10),
('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', 'Circuit design workshop', 20),
('https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80', 'Tech innovation lab', 30),
('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80', 'Cybersecurity challenge arena', 40),
('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80', 'Code battle finals', 50),
('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80', 'Team collaboration zone', 60),
('https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=1200&q=80', 'Innovation showcase floor', 70),
('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80', 'Behind the scenes — mission control', 80);

-- Update existing competitions with demo images
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80' WHERE name = 'Chakravyuh';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80' WHERE name = 'Innovation Challenge';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80' WHERE name = 'Sumo Bot';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80' WHERE name = 'Robo Soccer';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80' WHERE name = 'Robo Race';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80' WHERE name = 'Assembly Robot Race';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=1200&q=80' WHERE name = 'Water Rocket';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80' WHERE name = 'Drone Racing';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80' WHERE name = 'Robo Hockey';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80' WHERE name = 'Aero Modeling Challenge';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80' WHERE name = 'FPV Car Racing';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80' WHERE name = 'Aeromodelling Racing';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80' WHERE name = 'Web / IT Technology';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80' WHERE name = 'ROBOWAR';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=1200&q=80' WHERE name = 'Reel Making Challenge';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80' WHERE name = 'BGMI Championship';
UPDATE public.competitions SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80' WHERE name = 'Amateur Astronomer Conference';