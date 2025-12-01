import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages用のbaseパス（リポジトリ名に合わせて変更してください）
  base: process.env.NODE_ENV === 'production' ? '/wifi-is-here/' : '/',
});
