import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/Hero";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import FeaturedZX9 from "@/components/home/FeaturedZX9";
import FeaturedZX7 from "@/components/home/FeaturedZX7";
import FeaturedYX1 from "@/components/home/FeaturedYX1";
import AboutSection from "@/components/home/AboutSection";

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
      <section className="container-p py-[120px] md:py-24 lg:py-[120px]">
        <Categories />
      </section>

      {/* featured speaker ZX9 */}
      <FeaturedZX9 />

      {/* featured speaker ZX7 */}
      <FeaturedZX7 />

      {/* featured earphones YX1 */}
      <FeaturedYX1 />

      {/* About section */}
      <AboutSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
