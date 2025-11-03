"use client";
import { useState } from "react";
import Button from "../button";
import NumberInput from "../form/NumberInput";
import { useCart } from "@/contexts/CartContext";

interface AddToCartProps {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    category: string;
  };
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Extract short name from the full product name
    const shortName = product.name
      .replace("Headphones", "")
      .replace("Earphones", "")
      .replace("Speaker", "")
      .replace("Wireless", "")
      .trim();

    addToCart(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        shortName: shortName,
        price: product.price,
        image: product.image.mobile, // Use mobile image for cart
        category: product.category,
      },
      quantity
    );

    // Reset quantity to 1 after adding
    setQuantity(1);

    // Optional: Show a toast notification here
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (
    <div className="flex gap-4">
      <NumberInput value={quantity} onChange={setQuantity} min={1} max={99} />
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default AddToCart;
