import HeroSection from "@/components/home/Hero";
import NavBar from "@/components/shared/NavBar";

const Home = () => {
  return (
    <div className="relative">
      {/* nav bar component - positioned absolutely over hero */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <NavBar className="bg-black/10" />
      </div>
      {/* hero section component - full viewport height */}
      <HeroSection />
      {/* categories component */}
      {/* featured speaker1 */}
      {/* featured speaker2 */}
      {/* featured earphone1 */}
      {/* featured earphone2 */}
      {/* Footer component */}
    </div>
  );
};

export default Home;
