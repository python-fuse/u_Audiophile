import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container-p mb-[120px] md:mb-[96px] lg:mb-[200px]">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-[63px] lg:gap-[125px]">
        {/* Image */}
        <div className="relative w-full lg:flex-1 h-[300px] md:h-[300px] lg:h-[588px] rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/assets/shared/mobile/image-best-gear.jpg"
            alt="Person wearing headphones"
            fill
            className="object-cover md:hidden"
          />
          <Image
            src="/assets/shared/tablet/image-best-gear.jpg"
            alt="Person wearing headphones"
            fill
            className="object-cover hidden md:block lg:hidden"
          />
          <Image
            src="/assets/shared/desktop/image-best-gear.jpg"
            alt="Person wearing headphones"
            fill
            className="object-cover hidden lg:block"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:flex-1 text-center lg:text-left lg:max-w-[445px]">
          <h2 className="mb-8 px-6 md:px-[58px] lg:px-0">
            Bringing you the <span className="text-primary">best</span> audio
            gear
          </h2>
          <p className="text-black/50">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
