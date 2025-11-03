import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";
import Button from "@/components/button";
import { getProductsByCategory, type Product } from "@/lib/products";

const HeadphonesPage = () => {
  const headphones = getProductsByCategory("headphones");

  return (
    <div>
      {/* Navigation */}
      <NavBar className="" />

      {/* Category Hero */}
      <div className="bg-black h-48 flex items-center justify-center">
        <h2 className="text-white uppercase">HEADPHONES</h2>
      </div>

      <div className="container-p">
        {/* Products List */}
        <section className="py-16 md:py-[120px] lg:py-40">
          <div className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-40">
            {headphones.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </section>

        {/* Category Cards */}
        <section className="py-[120px] md:pb-24 lg:pb-[120px]">
          <Categories />
        </section>
      </div>

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
        <Link href={`/headphones/${product.slug}`}>
          <Button>See Product</Button>
        </Link>
      </div>
    </div>
  );
};

export default HeadphonesPage;
