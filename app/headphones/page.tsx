import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";
import Button from "@/components/button";

// Headphones data from db.json
const headphones = [
  {
    id: 4,
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    categoryImage: {
      mobile:
        "/assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
      tablet:
        "/assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
      desktop:
        "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
    },
    new: true,
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  },
  {
    id: 3,
    slug: "xx99-mark-one-headphones",
    name: "XX99 Mark I Headphones",
    categoryImage: {
      mobile:
        "/assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg",
      tablet:
        "/assets/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg",
      desktop:
        "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg",
    },
    new: false,
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
  },
  {
    id: 2,
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    categoryImage: {
      mobile:
        "/assets/product-xx59-headphones/mobile/image-category-page-preview.jpg",
      tablet:
        "/assets/product-xx59-headphones/tablet/image-category-page-preview.jpg",
      desktop:
        "/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg",
    },
    new: false,
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
  },
];

const HeadphonesPage = () => {
  return (
    <div>
      {/* Navigation */}
      <NavBar className="" />

      {/* Category Hero */}
      <section className="bg-dark h-[192px] md:h-[246px] flex items-center justify-center">
        <h2 className="text-white">HEADPHONES</h2>
      </section>

      {/* Product List */}
      <section className="container-p py-16 md:py-[120px] lg:py-[160px]">
        <div className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-[160px]">
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
      <section className="container-p pb-[120px] md:pb-[96px] lg:pb-[120px]">
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
  product: (typeof headphones)[0];
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
      <div className="relative w-full lg:flex-1 h-[352px] md:h-[352px] lg:h-[560px] rounded-lg overflow-hidden bg-light flex-shrink-0">
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
