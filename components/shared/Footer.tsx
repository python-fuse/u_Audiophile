import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container-p py-[52px] md:py-[60px] lg:py-[75px]">
        {/* Orange accent bar */}
        <div className="w-[101px] h-1 bg-primary mb-12 md:mb-8 lg:mb-9 mx-auto md:mx-0" />

        {/* Logo and Navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 md:mb-8 lg:mb-9">
          {/* Logo */}
          <Link href="/" className="mb-12 md:mb-0 mx-auto md:mx-0">
            <Image
              src="/assets/logo.svg"
              alt="Audiophile logo"
              width={143}
              height={25}
            />
          </Link>

          {/* Navigation */}
          <nav className="mx-auto md:mx-0">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left font-bold text-sm uppercase tracking-[2px]">
              <li className="duration-300 hover:text-primary">
                <Link href="/">Home</Link>
              </li>
              <li className="duration-300 hover:text-primary">
                <Link href="/headphones">Headphones</Link>
              </li>
              <li className="duration-300 hover:text-primary">
                <Link href="/speakers">Speakers</Link>
              </li>
              <li className="duration-300 hover:text-primary">
                <Link href="/earphones">Earphones</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Description and Social Icons */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end">
          {/* Description */}
          <p className="text-white/50 text-[15px] leading-[25px] text-center md:text-left max-w-[540px] mb-12 md:mb-20 lg:mb-0 mx-auto md:mx-0">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we're open 7 days a week.
          </p>

          {/* Social Icons - Desktop only at end */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>

        {/* Copyright and Social Icons (Mobile/Tablet) */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
          <p className="text-white/50 font-bold text-[15px] leading-[25px] text-center md:text-left mb-12 md:mb-0">
            Copyright 2021. All Rights Reserved
          </p>

          {/* Social Icons - Mobile/Tablet */}
          <div className="flex lg:hidden gap-4 items-center justify-center md:justify-end">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-350"
            >
              <Image
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
