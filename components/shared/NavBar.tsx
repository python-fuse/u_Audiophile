"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartModal from "../cart/CartModal";
import Categories from "../home/Categories";
import { useCart } from "@/contexts/CartContext";

const NavBar = ({ className = "" }: { className?: string }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();

  const itemCount = getItemCount();

  return (
    <>
      <header
        className={`bg-black h-[76px] flex items-center container-p justify-between border-b border-white/20 relative z-50 ${className}`}
      >
        {/* Left side - Hamburger (mobile/tablet) */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src="/assets/shared/tablet/icon-hamburger.svg"
            alt="Menu"
            width={16}
            height={15}
          />
        </button>

        {/* Logo - Centered on tablet, left on mobile & desktop */}
        <Link
          href="/"
          className="md:absolute md:left-1/2 md:-translate-x-1/2 lg:static lg:transform-none"
        >
          <Image
            src={"/assets/logo.svg"}
            alt="Audiophile logo"
            className=""
            width={143}
            height={25}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
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
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative"
          aria-label="Shopping cart"
        >
          <Image
            src={"/assets/carts.svg"}
            alt="cart"
            width={23.33}
            height={20}
            className="duration-300 hover:text-primary"
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </header>

      {/* Mobile/Tablet Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed top-[76px] left-0 right-0 bg-white z-40 lg:hidden rounded-b-lg max-h-[calc(100vh-76px)] overflow-y-auto">
            <div className="container-p py-8 md:py-14">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Categories />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;
