import Image from "next/image";
import Link from "next/link";
import Button from "../button";

const FeaturedYX1 = () => {
  return (
    <section className="container-p mb-[120px] md:mb-24 lg:mb-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[11px] lg:gap-[30px]">
        {/* Image */}
        <div className="relative h-[200px] md:h-80 rounded-lg overflow-hidden">
          <Image
            src="/assets/home/mobile/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            fill
            className="object-cover md:hidden"
          />
          <Image
            src="/assets/home/tablet/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            fill
            className="object-cover hidden md:block lg:hidden"
          />
          <Image
            src="/assets/home/desktop/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            fill
            className="object-cover hidden lg:block"
          />
        </div>

        {/* Content */}
        <div className="bg-light rounded-lg h-[200px] md:h-80 flex flex-col justify-center pl-6 md:pl-[41px] lg:pl-[95px]">
          <h4 className="mb-8">YX1 EARPHONES</h4>
          <Link href="/earphones/yx1-earphones">
            <Button variant="outlined">See Product</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedYX1;
