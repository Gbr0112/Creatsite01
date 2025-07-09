import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { viteStaticCopy } from "vite-plugin-static-copy";

// Corrige __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Evita erro com plugins ESM como vite-plugin-static-copy
  ssr: {
    noExternal: ["vite-plugin-static-copy"],
  },
 // plugins: [
  //  react(),
  //  viteStaticCopy({
   //   targets: [
     //   {
        //  src: "public/_redirects", // Arquivo que o Netlify precisa para SPA
      //    dest: ".",                // Vai para dist/client/
      //  },
    //  ],
   // }),
  //],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: false,
  },
});
