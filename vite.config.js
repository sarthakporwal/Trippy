// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "lib": path.resolve(__dirname, "./src/lib"),
      "hooks": path.resolve(__dirname, "./src/hooks")
    }
  }
})