import AboutSection from "~/sections/about";
import AchievementsSection from "~/sections/achievements";
import Header from "~/sections/header";
import IntroSection from "~/sections/intro";
import SubscribeSection from "~/sections/subscribe";
import SupportSection from "~/sections/support";

const Home = () => {
  return (
    <div className="bg-red-800">
      <Header />
      <IntroSection />
      <SubscribeSection />
      <SupportSection />
      <AboutSection />
      <AchievementsSection />
    </div>
  )
  
}

export default Home;