import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";
import Button from "@/components/button";
import AddToCart from "@/components/product/AddToCart";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <NavBar className="" />
      <div className="container-p">
        <Link
          href={`/${product.category}`}
          className="inline-block text-black/50 hover:text-primary transition-colors mt-4 md:mt-[33px] lg:mt-[79px] mb-6 md:mb-6 lg:mb-14"
        >
          Go Back
        </Link>

        <section className="mb-[88px] md:mb-[120px] lg:mb-40">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-[69px] lg:gap-[125px]">
            <div className="relative w-full lg:flex-1 h-[327px] md:h-[480px] lg:h-[560px] rounded-lg overflow-hidden bg-light shrink-0">
              <Image
                src={product.image.mobile}
                alt={product.name}
                fill
                className="object-cover md:hidden"
              />
              <Image
                src={product.image.tablet}
                alt={product.name}
                fill
                className="object-cover hidden md:block lg:hidden"
              />
              <Image
                src={product.image.desktop}
                alt={product.name}
                fill
                className="object-cover hidden lg:block"
              />
            </div>

            <div className="w-full lg:flex-1 lg:pt-[60px]">
              {product.new && (
                <p className="overlined text-primary mb-6 md:mb-4">
                  New Product
                </p>
              )}
              <h2 className="mb-6 md:mb-8 max-w-[300px]">{product.name}</h2>
              <p className="text-black/50 mb-6 md:mb-8">
                {product.description}
              </p>
              <p className="text-[18px] font-bold tracking-[1.29px] mb-[31px] md:mb-[47px]">
                $ {product.price.toLocaleString()}
              </p>

              <AddToCart product={product} />
            </div>
          </div>
        </section>

        <section className="mb-[88px] md:mb-[120px] lg:mb-40">
          <div className="flex flex-col lg:flex-row gap-[88px] md:gap-[120px] lg:gap-[125px]">
            <div className="lg:flex-2">
              <h3 className="mb-6 md:mb-8">Features</h3>
              <div className="text-black/50 whitespace-pre-line">
                {product.features}
              </div>
            </div>

            <div className="lg:flex-1">
              <h3 className="mb-6 md:mb-8">In the box</h3>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex gap-6">
                    <span className="text-primary font-bold w-4">
                      {item.quantity}x
                    </span>
                    <span className="text-black/50">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-[120px] md:mb-[120px] lg:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-5 md:gap-[18px] lg:gap-[30px]">
            <div className="flex flex-col gap-5 md:gap-[18px] lg:gap-[30px]">
              <div className="relative h-[174px] md:h-[174px] lg:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={product.gallery.first.mobile}
                  alt="Gallery 1"
                  fill
                  className="object-cover md:hidden"
                />
                <Image
                  src={product.gallery.first.tablet}
                  alt="Gallery 1"
                  fill
                  className="object-cover hidden md:block lg:hidden"
                />
                <Image
                  src={product.gallery.first.desktop}
                  alt="Gallery 1"
                  fill
                  className="object-cover hidden lg:block"
                />
              </div>
              <div className="relative h-[174px] md:h-[174px] lg:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={product.gallery.second.mobile}
                  alt="Gallery 2"
                  fill
                  className="object-cover md:hidden"
                />
                <Image
                  src={product.gallery.second.tablet}
                  alt="Gallery 2"
                  fill
                  className="object-cover hidden md:block lg:hidden"
                />
                <Image
                  src={product.gallery.second.desktop}
                  alt="Gallery 2"
                  fill
                  className="object-cover hidden lg:block"
                />
              </div>
            </div>

            <div className="relative h-[368px] md:h-[368px] lg:h-[592px] rounded-lg overflow-hidden">
              <Image
                src={product.gallery.third.mobile}
                alt="Gallery 3"
                fill
                className="object-cover md:hidden"
              />
              <Image
                src={product.gallery.third.tablet}
                alt="Gallery 3"
                fill
                className="object-cover hidden md:block lg:hidden"
              />
              <Image
                src={product.gallery.third.desktop}
                alt="Gallery 3"
                fill
                className="object-cover hidden lg:block"
              />
            </div>
          </div>
        </section>

        <section className="mb-[120px] md:mb-[120px] lg:mb-40">
          <h3 className="text-center mb-10 md:mb-14 lg:mb-16">
            You may also like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[11px] lg:gap-[30px]">
            {product.others.map((item) => (
              <div key={item.slug} className="flex flex-col items-center">
                <div className="relative w-full h-[120px] md:h-[318px] rounded-lg overflow-hidden bg-light mb-8 md:mb-10">
                  <Image
                    src={item.image.mobile}
                    alt={item.name}
                    fill
                    className="object-cover md:hidden"
                  />
                  <Image
                    src={item.image.tablet}
                    alt={item.name}
                    fill
                    className="object-cover hidden md:block lg:hidden"
                  />
                  <Image
                    src={item.image.desktop}
                    alt={item.name}
                    fill
                    className="object-cover hidden lg:block"
                  />
                </div>
                <h5 className="mb-8">{item.name}</h5>
                <Link href={`/${product.category}/${item.slug}`}>
                  <Button>See Product</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-[120px] md:mb-24 lg:mb-[120px]">
          <Categories />
        </section>
      </div>

      <AboutSection />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
