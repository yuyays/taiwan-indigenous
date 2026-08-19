import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://living-atlas.example",
  output: "static",
  integrations: [react(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
