import Image from "next/image";
import React from "react";
import Button from "../button";
import Link from "next/link";
import styles from "./category.module.css";

const categoriesData = [
  {
    title: "Headphones",
    imageUrl: "/assets/headphone.png",
    href: "/headphones",
  },
  {
    title: "Speakers",
    imageUrl: "/assets/speaker.png",
    href: "/speakers",
  },
  {
    title: "Earphones",
    imageUrl: "/assets/earphone.png",
    href: "/earphones",
  },
];

const Categories = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-x-[30px] gap-y-[30px] items-center">
      {categoriesData.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          imageUrl={category.imageUrl}
          href={category.href}
        />
      ))}
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  href: string;
}
export const CategoryCard: React.FC<CategoryCardProps> = ({
  href,
  imageUrl,
  title,
}) => {
  return (
    <div
      className={`${styles["cat-card"]} md:flex-1 w-full md:min-w-[223px] lg:min-w-[350px] md:w-auto h-[217px] md:h-[204px] flex flex-col justify-end items-center gap-y-4 pb-6`}
    >
      <Image src={imageUrl} alt={title} width={122.95} height={160} />
      <h6>{title}</h6>
      <Link href={href}>
        <Button variant="text-icon">Shop</Button>
      </Link>
    </div>
  );
};

export default Categories;
