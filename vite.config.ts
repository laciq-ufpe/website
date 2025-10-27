import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // In dev, serve at root; in CI, prefer VITE_BASE provided by the workflow.
  const fallbackBase = mode === "development" ? "/" : "/website/";
  return {
    base: process.env.VITE_BASE ?? fallbackBase,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
