import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container-p mb-[120px] md:mb-24 lg:mb-[120px]">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-[63px] lg:gap-[125px]">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="mb-8">
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
        <div className="relative w-full lg:flex-1 h-[300px] md:h-[300px] lg:h-[588px] rounded-lg overflow-hidden shrink-0">
          <Image
            src="/assets/shared/mobile/image-best-gear.jpg"
            alt="Person with headphones"
            fill
            className="object-cover md:hidden"
          />
          <Image
            src="/assets/shared/tablet/image-best-gear.jpg"
            alt="Person with headphones"
            fill
            className="object-cover hidden md:block lg:hidden"
          />
          <Image
            src="/assets/shared/desktop/image-best-gear.jpg"
            alt="Person with headphones"
            fill
            className="object-cover hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
