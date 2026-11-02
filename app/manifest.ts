import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kettle UI by Apurva",
    short_name: "Kettle UI",
    description: "React components with ink outlines, hard offset shadows and spring animations.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf6ea",
    theme_color: "#fbf6ea",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
