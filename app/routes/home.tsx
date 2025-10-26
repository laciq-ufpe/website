import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import AboutSection from "~/sections/about";
import AchievementsSection from "~/sections/achievements";
import Header from "~/sections/header";
import IntroSection from "~/sections/intro";
import SubscribeSection from "~/sections/subscribe";
import SupportSection from "~/sections/support";

export async function loader(_: Route.LoaderArgs) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const publicDir = path.resolve(process.cwd(), "public");
  let entries: string[] = [];
  try {
    entries = await fs.readdir(publicDir);
  } catch {
    // ignore if public folder is not readable
  }

  const logos = entries
    .filter((name) => name.startsWith("logo_") && /\.(png|jpe?g|svg|webp|gif)$/i.test(name))
    .sort()
    .map((name) => `/${name}`);

  return { logos };
}

const Home = () => {
  const { logos } = useLoaderData<typeof loader>();

  return (
    <div className="bg-red-800">
      <Header />
      <IntroSection />
      <SubscribeSection />
      <SupportSection logos={logos} />
      <AboutSection />
      <AchievementsSection />
    </div>
  );
};

export default Home;