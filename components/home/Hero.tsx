import Link from "next/link";
import Button from "../button";
import styles from "./hero.module.css";

const HeroSection = () => {
  return (
    <main
      className={`${styles.hero} flex items-center bg-no-repeat bg-cover container-p`}
      style={{ minHeight: "100vh" }}
    >
      {/* Highlight product */}
      <div
        className={`${styles.heroContent} text-white flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[398px] lg:h-[346px] gap-y-6`}
      >
        <p className="overlined uppercase">New product</p>

        <h1>xx99 mark II headphones</h1>

        <p className="md:max-w-[349px]">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>

        <Link href="/headphones/xx99-mark-two-headphones">
          <Button>See Product</Button>
        </Link>
      </div>
    </main>
  );
};

export default HeroSection;
