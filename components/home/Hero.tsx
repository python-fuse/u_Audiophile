import styles from "./hero.module.css";

const HeroSection = () => {
  return (
    <main
      className={`${styles.hero} flex
      bg-hero-mobile md:bg-hero-tablet lg:bg-hero-desktop 
      bg-no-repeat bg-cover 
      container-p`}
      style={{ minHeight: "calc(100vh - var(--header-height, 76px))" }}
    >
      {/* Highlight product */}
      <div className="flex flex-col gap-y-6 justify-between hero-text-mobile md:hero-text-tablet lg:hero-text-desktop">
        hi
      </div>
      {/* Its image */}
    </main>
  );
};

export default HeroSection;
