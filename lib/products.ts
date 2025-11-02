import productsData from "@/public/assets/db.json";

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    second: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    third: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  others: Array<{
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }>;
}

// Helper to clean image paths (remove ./ prefix)
function cleanImagePath(path: string): string {
  return path.replace(/^\.\//, "/");
}

// Helper to clean all image paths in a product
function cleanProductImages(product: any): Product {
  return {
    ...product,
    image: {
      mobile: cleanImagePath(product.image.mobile),
      tablet: cleanImagePath(product.image.tablet),
      desktop: cleanImagePath(product.image.desktop),
    },
    categoryImage: {
      mobile: cleanImagePath(product.categoryImage.mobile),
      tablet: cleanImagePath(product.categoryImage.tablet),
      desktop: cleanImagePath(product.categoryImage.desktop),
    },
    gallery: {
      first: {
        mobile: cleanImagePath(product.gallery.first.mobile),
        tablet: cleanImagePath(product.gallery.first.tablet),
        desktop: cleanImagePath(product.gallery.first.desktop),
      },
      second: {
        mobile: cleanImagePath(product.gallery.second.mobile),
        tablet: cleanImagePath(product.gallery.second.tablet),
        desktop: cleanImagePath(product.gallery.second.desktop),
      },
      third: {
        mobile: cleanImagePath(product.gallery.third.mobile),
        tablet: cleanImagePath(product.gallery.third.tablet),
        desktop: cleanImagePath(product.gallery.third.desktop),
      },
    },
    others: product.others.map((other: any) => ({
      ...other,
      image: {
        mobile: cleanImagePath(other.image.mobile),
        tablet: cleanImagePath(other.image.tablet),
        desktop: cleanImagePath(other.image.desktop),
      },
    })),
  };
}

export const products: Product[] = productsData.data.map(cleanProductImages);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products
    .filter((product) => product.category === category)
    .sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); // New products first
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}
