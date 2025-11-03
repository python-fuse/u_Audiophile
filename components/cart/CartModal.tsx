"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";
import { useCart } from "@/contexts/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, clearCart, getSubtotal, getItemCount } =
    useCart();

  if (!isOpen) return null;

  const totalPrice = getSubtotal();
  const totalItems = getItemCount();

  const handleRemoveAll = () => {
    clearCart();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Cart Modal */}
      <div className="fixed top-[114px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[39px] lg:right-[165px] z-50 w-[calc(100%-48px)] max-w-[377px] bg-white rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h6 className="text-[18px]">CART ({totalItems})</h6>
          <button
            className="text-[15px] text-black/50 underline hover:text-primary"
            onClick={handleRemoveAll}
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        {items.length > 0 ? (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[15px] text-black/50 uppercase">Total</span>
              <span className="text-[18px] font-bold">
                $ {totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={onClose}>
              <Button className="w-full">Checkout</Button>
            </Link>
          </>
        ) : (
          <p className="text-center text-black/50">Your cart is empty</p>
        )}
      </div>
    </>
  );
};

interface CartItemRowProps {
  item: {
    id: number;
    name: string;
    shortName: string;
    price: number;
    quantity: number;
    image: string;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Product Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-light shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <p className="text-[15px] font-bold">{item.shortName}</p>
        <p className="text-[14px] text-black/50 font-bold">
          $ {item.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center bg-light h-8 w-24">
        <button
          className="w-8 h-full text-black/25 hover:text-primary font-bold text-[13px]"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="flex-1 text-center font-bold text-[13px]">
          {item.quantity}
        </span>
        <button
          className="w-8 h-full text-black/25 hover:text-primary font-bold text-[13px]"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartModal;
