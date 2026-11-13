import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The project lives on a Windows drive (/mnt/c) edited from WSL, where
    // file-change events don't propagate: poll so HMR picks up every edit.
    watch: { usePolling: true, interval: 300 },
  },
});
