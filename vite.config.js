import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "HT Maintenance",
        short_name: "HT Maintenance",
        description: "Suivi des interventions de maintenance préventive HT",
        start_url: "/",
        display: "standalone",
        background_color: "#F1F3F6",
        theme_color: "#1A1F26",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Précharge et met en cache tout ce qui est nécessaire pour lancer l'app hors ligne,
        // y compris le module "docx" chargé dynamiquement (utilisé par le bouton Rapport Word) :
        // sans ce runtimeCaching, ce module précis resterait indisponible sans connexion tant
        // qu'il n'a pas été chargé au moins une fois avec internet actif.
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/assets/"),
            handler: "CacheFirst",
            options: { cacheName: "app-assets", expiration: { maxEntries: 100 } },
          },
        ],
      },
    }),
  ],
});
