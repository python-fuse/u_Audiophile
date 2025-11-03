import Image from "next/image";
import Link from "next/link";
import Button from "../button";
import styles from "./featured-zx9.module.css";

const FeaturedZX9 = () => {
  return (
    <section className={`${styles.featured} container-p`}>
      <div
        className={`${styles.container} bg-primary rounded-lg overflow-hidden relative`}
      >
        {/* Pattern circles background */}
        <div className={styles.pattern} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-[138px] py-[55px] md:py-16 lg:py-24 px-6 md:px-[95px] lg:px-[95px]">
          {/* Product Image */}
          <div className={`${styles.imageWrapper} shrink-0`}>
            <Image
              src="/assets/home/desktop/image-speaker-zx9.png"
              alt="ZX9 Speaker"
              width={410}
              height={493}
              className={styles.speakerImage}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[349px]">
            <h2 className="text-white mb-6">ZX9 SPEAKER</h2>
            <p className="text-white/75 mb-6 md:mb-10">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link href="/speakers/zx9-speaker">
              <Button
                variant="outlined"
                className="bg-dark text-white border-0 hover:bg-[#4C4C4C]"
              >
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedZX9;
