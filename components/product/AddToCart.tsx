"use client";
import { useState } from "react";
import Button from "../button";
import NumberInput from "../form/NumberInput";

interface AddToCartProps {
  productName: string;
  productPrice: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productName, productPrice }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // This will be connected to global cart state later
    console.log(`Adding ${quantity} ${productName}(s) to cart`);
    // For now, just show an alert
    alert(`Added ${quantity} ${productName}(s) to cart`);
  };

  return (
    <div className="flex gap-4">
      <NumberInput value={quantity} onChange={setQuantity} min={1} max={99} />
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default AddToCart;
