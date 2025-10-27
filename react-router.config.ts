import type { Config } from "@react-router/dev/config";

const fallbackBase = process.env.NODE_ENV === "development" ? "/" : "/website/";
const base = process.env.VITE_BASE ?? fallbackBase;

export default {
  ssr: false,
  basename: base.replace(/\/$/, "") || "/",
} satisfies Config;
