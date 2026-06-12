import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteShell } from "@/components/SiteNav";
import { listGallery } from "@/lib/content.functions";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | RIRO World Cup 2026" },
      { name: "description", content: "Photo gallery from the RIRO World Cup arena — robotics, drones, and STEM moments." },
      { property: "og:title", content: "RIRO 2026 Gallery" },
      { property: "og:description", content: "Photos from the arena." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const fetchGallery = useServerFn(listGallery);
  const q = useQuery({ queryKey: ["gallery"], queryFn: () => fetchGallery() });
  const gallery = q.data?.images ?? [];

  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-3">[ GALLERY ]</h2>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-[0.95] mb-6">
          From The Arena
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12">
          {gallery.length} {gallery.length === 1 ? "photo" : "photos"} from the championship.
        </p>
        {gallery.length === 0 ? (
          <div className="border border-border rounded-sm p-12 text-center font-mono text-sm text-muted-foreground">
            No photos uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((img: any) => (
              <figure key={img.id} className="border border-border rounded-sm overflow-hidden bg-background">
                <img
                  src={img.image_url}
                  alt={img.caption || "RIRO World Cup 2026 gallery image"}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                {img.caption && (
                  <figcaption className="p-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
