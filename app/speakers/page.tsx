import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";
import Button from "@/components/button";
import { getProductsByCategory, type Product } from "@/lib/products";

const SpeakersPage = () => {
  const speakers = getProductsByCategory("speakers");

  return (
    <div>
      {/* Navigation */}
      <NavBar className="" />

      {/* Category Hero */}
      <section className="bg-black h-48 md:h-[246px] flex items-center justify-center">
        <h2 className="text-white">SPEAKERS</h2>
      </section>

      {/* Product List */}
      <section className="container-p py-16 md:py-[120px] lg:py-40">
        <div className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-40">
          {speakers.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="container-p pb-[120px] md:pb-24 lg:pb-[120px]">
        <Categories />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  reverse: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, reverse }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 md:gap-[52px] lg:gap-[125px] ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full lg:flex-1 h-[352px] md:h-[352px] lg:h-[560px] rounded-lg overflow-hidden bg-light shrink-0">
        <Image
          src={product.categoryImage.mobile}
          alt={product.name}
          fill
          className="object-cover md:hidden"
        />
        <Image
          src={product.categoryImage.tablet}
          alt={product.name}
          fill
          className="object-cover hidden md:block lg:hidden"
        />
        <Image
          src={product.categoryImage.desktop}
          alt={product.name}
          fill
          className="object-cover hidden lg:block"
        />
      </div>

      {/* Product Content */}
      <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        {product.new && (
          <p className="overlined text-primary mb-6 md:mb-4">New Product</p>
        )}
        <h2 className="mb-6 md:mb-8 max-w-[300px] lg:max-w-none">
          {product.name}
        </h2>
        <p className="text-black/50 mb-6 md:mb-8 max-w-[572px]">
          {product.description}
        </p>
        <Link href={`/speakers/${product.slug}`}>
          <Button>See Product</Button>
        </Link>
      </div>
    </div>
  );
};

export default SpeakersPage;
