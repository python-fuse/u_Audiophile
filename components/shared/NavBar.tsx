import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="bg-black h-[76px] flex items-center px-[165px] lg:justify-between border-b border-white/10">
      {/* title link */}
      <Link href="/">
        <Image
          src={"/assets/logo.svg"}
          alt="Audiophile logo"
          className=""
          width={143}
          height={25}
        />
      </Link>
      <nav>
        <ul className="flex gap-8 text-white font-bold text-sm uppercase">
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

      {/* cart */}
      <button>
        <Image
          src={"/assets/carts.svg"}
          alt="cart"
          width={23.33}
          height={20}
          className="duration-300 hover:text-primary"
        />
      </button>
    </header>
  );
};

export default NavBar;
