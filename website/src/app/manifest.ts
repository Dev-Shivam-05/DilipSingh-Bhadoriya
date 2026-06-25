import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Dilipsingh B.",
    description: site.tagline.en,
    start_url: "/",
    display: "standalone",
    background_color: "#06131f",
    theme_color: "#0e2a47",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
