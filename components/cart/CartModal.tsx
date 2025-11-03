"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

interface CartItem {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hardcoded cart items for now - will be replaced with global state later
const cartItems: CartItem[] = [
  {
    id: 4,
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    shortName: "XX99 MK II",
    price: 2999,
    quantity: 1,
    image: "/assets/product-xx99-mark-two-headphones/mobile/image-product.jpg",
  },
  {
    id: 2,
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    shortName: "XX59",
    price: 899,
    quantity: 2,
    image: "/assets/product-xx59-headphones/mobile/image-product.jpg",
  },
  {
    id: 1,
    slug: "yx1-earphones",
    name: "YX1 Wireless Earphones",
    shortName: "YX1",
    price: 599,
    quantity: 1,
    image: "/assets/product-yx1-earphones/mobile/image-product.jpg",
  },
];

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
            onClick={() => {
              // Will handle remove all logic later
              console.log("Remove all items");
            }}
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <CartItemRow key={item.id} item={item} />
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
  item: CartItem;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
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
          onClick={() => {
            // Will handle decrement later
            console.log("Decrement", item.id);
          }}
        >
          -
        </button>
        <span className="flex-1 text-center font-bold text-[13px]">
          {item.quantity}
        </span>
        <button
          className="w-8 h-full text-black/25 hover:text-primary font-bold text-[13px]"
          onClick={() => {
            // Will handle increment later
            console.log("Increment", item.id);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartModal;
