import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Signal Lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This coordinate is off the grid. Return to base.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-mono font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          System interrupted
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try reloading or head back to base.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-mono font-bold uppercase tracking-widest text-primary-foreground"
          >
            Retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent px-4 py-2 text-sm font-mono font-bold uppercase tracking-widest text-foreground hover:border-primary"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RIRO World Cup 2026 | International Robotics & Innovation Championship" },
      {
        name: "description",
        content:
          "4-day mega event Oct–Nov 2026 in Mira-Bhayander. Robotics, drones, aerospace, gaming, STEM. Register your team now.",
      },
      { name: "author", content: "RIRO World Cup" },
      { property: "og:title", content: "RIRO World Cup 2026 | International Robotics & Innovation Championship" },
      {
        property: "og:description",
        content:
          "4-day mega event Oct–Nov 2026 in Mira-Bhayander. Robotics, drones, aerospace, gaming, STEM. Register your team now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "RIRO World Cup 2026 | International Robotics & Innovation Championship" },
      {
        name: "twitter:description",
        content: "4-day mega event Oct–Nov 2026 in Mira-Bhayander. Robotics, drones, aerospace, gaming, STEM. Register your team now.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bd0ad745-5ec0-4d6b-b997-8b015dda7189/id-preview-196b9f38--ff4d6678-3de8-4972-b78d-fe0e786252eb.lovable.app-1783719305801.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bd0ad745-5ec0-4d6b-b997-8b015dda7189/id-preview-196b9f38--ff4d6678-3de8-4972-b78d-fe0e786252eb.lovable.app-1783719305801.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-center" richColors />
    </QueryClientProvider>
  );
}
