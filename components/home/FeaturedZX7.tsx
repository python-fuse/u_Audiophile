import Link from "next/link";
import Button from "../button";
import styles from "./featured-zx7.module.css";

const FeaturedZX7 = () => {
  return (
    <section className={`${styles.featured} container-p`}>
      <div
        className={`${styles.container} rounded-lg overflow-hidden relative h-80 flex items-center`}
      >
        {/* Background image handled in CSS */}

        <div className="relative z-10 pl-6 md:pl-[62px] lg:pl-[95px]">
          <h4 className="mb-8">ZX7 SPEAKER</h4>
          <Link href="/speakers/zx7-speaker">
            <Button variant="outlined">See Product</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedZX7;
