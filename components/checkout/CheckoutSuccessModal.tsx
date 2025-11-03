"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

interface CartItem {
  id: number;
  shortName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  grandTotal: number;
  orderNumber?: string;
}

const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  grandTotal,
  orderNumber,
}) => {
  if (!isOpen) return null;

  const firstItem = cartItems[0];
  const remainingItems = cartItems.slice(1);
  const hasMoreItems = remainingItems.length > 0;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
        {/* Modal */}
        <div className="bg-white rounded-lg max-w-[540px] w-full p-8 md:p-12">
          {/* Checkmark Icon */}
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.5L7 14.5L19 1.5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-[24px] md:text-[32px] leading-[28px] md:leading-[36px] tracking-[0.86px] md:tracking-[1.14px]">
            THANK YOU <br />
            FOR YOUR ORDER
          </h3>

          {/* Order Number */}
          {orderNumber && (
            <p className="text-[15px] font-bold mb-2">
              Order Number: <span className="text-primary">{orderNumber}</span>
            </p>
          )}

          {/* Subtitle */}
          <p className="text-black/50 text-[15px] leading-[25px] mb-6">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
              {/* Items List */}
              <div className="bg-light p-6">
                {/* First Item */}
                {firstItem && (
                  <div className="flex items-center gap-4">
                    <div className="relative w-[50px] h-[50px] rounded-lg overflow-hidden bg-light shrink-0">
                      <Image
                        src={firstItem.image}
                        alt={firstItem.shortName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-bold">
                        {firstItem.shortName}
                      </p>
                      <p className="text-[14px] text-black/50 font-bold">
                        $ {firstItem.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-[15px] text-black/50 font-bold">
                      x{firstItem.quantity}
                    </p>
                  </div>
                )}

                {/* View Less/More Button */}
                {hasMoreItems && (
                  <>
                    <div className="border-t border-black/10 my-3" />
                    <button className="text-[12px] text-black/50 font-bold tracking-[-0.21px] hover:text-primary transition-colors">
                      and {remainingItems.length} other item
                      {remainingItems.length > 1 ? "s" : ""}
                    </button>
                  </>
                )}
              </div>

              {/* Grand Total */}
              <div className="bg-black p-6 flex flex-col justify-end">
                <p className="text-white/50 text-[15px] uppercase mb-2">
                  GRAND TOTAL
                </p>
                <p className="text-white text-[18px] font-bold">
                  $ {grandTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <Link href="/" onClick={onClose}>
            <Button className="w-full">BACK TO HOME</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccessModal;
