import Image from "next/image";
import Link from "next/link";

const FeaturedZX9 = () => {
  return (
    <section className="container-p mb-6 md:mb-8 lg:mb-12">
      <div className="bg-primary  rounded-lg overflow-hidden relative h-[600px] md:h-[720px] lg:h-[560px]">
        {/* Pattern circles background - positioned behind speaker */}
        {/* <div className="absolute top-[28%] left-1/2 -translate-x-1/2 md:top-[25%] lg:top-1/2 lg:left-[23%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-[558px] h-[558px] md:w-[944px] md:h-[944px] z-0">
          <Image
            src="/assets/home/desktop/pattern-circles.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div> */}

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center lg:items-end justify-end px-6 md:px-[95px] lg:px-[95px] py-[55px] md:py-16 lg:py-[96px] ">
          {/* Speaker Image */}
          {/* Mobile & Tablet - smaller image */}
          <Image
            src="/assets/zx9-tab-mob.png"
            alt="ZX9 Speaker"
            fill
            className="object-contain lg:hidden relative w-[172px] h-[207px] md:w-[197px] md:h-[237px] lg:w-[410px] lg:h-[493px]  mb-auto md:mb-auto lg:mb-0 mt-0 lg:mt-auto"
            style={{
              top: "-20%",
            }}
          />
          {/* Desktop - larger image */}
          <Image
            src="/assets/zx9-desktop.png"
            alt="ZX9 Speaker"
            fill
            className="object-contain hidden lg:block absolute w-[172px] h-[207px] md:w-[197px] md:h-[237px] lg:w-[410px] lg:h-[493px] shrink-0 mb-auto md:mb-auto lg:mb-0 mt-0 left-[-90%] bottom-0 lg:mt-auto"
            style={{
              left: "-20%",
            }}
          />

          {/* Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[349px] mt-auto lg:mt-0">
            <h1 className="text-white mb-6 text-[36px] md:text-[56px] font-bold leading-[40px] md:leading-[58px] tracking-[1.29px] md:tracking-[2px] uppercase">
              ZX9
              <br />
              SPEAKER
            </h1>
            <p className="text-white/75 mb-6 md:mb-10 text-[15px] leading-[25px]">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link href="/speakers/zx9-speaker" className="z-20">
              <button id="zx9" className=" hover:bg-[#4C4C4C] border-0">
                See Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedZX9;
