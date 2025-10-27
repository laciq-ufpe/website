import { promises as fs } from "node:fs";
import path from "node:path";

const IMAGE_PATTERN = /\.(png|jpe?g|svg|webp|gif)$/i;

async function listImages(dir) {
  try {
    const abs = path.resolve(process.cwd(), dir);
    const entries = await fs.readdir(abs);
    return entries.filter((n) => IMAGE_PATTERN.test(n)).sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

async function main() {
  const sponsorships = await listImages("public/sponsorships");
  const organizations = await listImages("public/organization");

  const outDir = path.resolve(process.cwd(), "app/data");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "sponsorships.json"), JSON.stringify(sponsorships, null, 2));
  await fs.writeFile(path.join(outDir, "organizations.json"), JSON.stringify(organizations, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});