"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import TextField from "@/components/form/TextField";
import RadioInput from "@/components/form/RadioInput";
import Button from "@/components/button";
import CheckoutSuccessModal from "@/components/checkout/CheckoutSuccessModal";

// Hardcoded cart items - will be replaced with global state later
const cartItems = [
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

const CheckoutPage = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("e-money");
  const [eMoneyNumber, setEMoneyNumber] = useState("");
  const [eMoneyPin, setEMoneyPin] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2); // 20% VAT
  const grandTotal = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success modal
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-light min-h-screen">
      <NavBar className="" />

      <div className="container-p py-4 md:py-8 lg:py-[79px]">
        <Link
          href="/"
          className="inline-block text-black/50 hover:text-primary transition-colors mb-6 md:mb-6"
        >
          Go Back
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[30px]">
            {/* Checkout Form */}
            <div className="flex-1 bg-white rounded-lg p-6 md:p-12">
              <h3 className="mb-8 md:mb-[41px]">CHECKOUT</h3>

              {/* Billing Details */}
              <div className="mb-8 md:mb-[53px]">
                <h6 className="text-primary text-[13px] font-bold tracking-[0.93px] mb-4">
                  BILLING DETAILS
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <TextField
                    label="Name"
                    value={name}
                    onChange={setName}
                    errorMsg=""
                  />
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    errorMsg=""
                  />
                  <TextField
                    label="Phone Number"
                    value={phone}
                    onChange={setPhone}
                    errorMsg=""
                  />
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8 md:mb-[61px]">
                <h6 className="text-primary text-[13px] font-bold tracking-[0.93px] mb-4">
                  SHIPPING INFO
                </h6>
                <div className="flex flex-col gap-6">
                  <TextField
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    errorMsg=""
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <TextField
                      label="ZIP Code"
                      value={zipCode}
                      onChange={setZipCode}
                      errorMsg=""
                    />
                    <TextField
                      label="City"
                      value={city}
                      onChange={setCity}
                      errorMsg=""
                    />
                  </div>
                  <TextField
                    label="Country"
                    value={country}
                    onChange={setCountry}
                    errorMsg=""
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h6 className="text-primary text-[13px] font-bold tracking-[0.93px] mb-4">
                  PAYMENT DETAILS
                </h6>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6">
                  <div className="flex flex-col gap-y-[9px]">
                    <label className="font-semibold text-gray-700 text-[12px]">
                      Payment Method
                    </label>
                  </div>
                  <div className="flex flex-col gap-4">
                    <RadioInput
                      id="e-money"
                      label="e-Money"
                      isActive={paymentMethod === "e-money"}
                      onSelect={() => setPaymentMethod("e-money")}
                    />
                    <RadioInput
                      id="cash"
                      label="Cash on Delivery"
                      isActive={paymentMethod === "cash"}
                      onSelect={() => setPaymentMethod("cash")}
                    />
                  </div>

                  {paymentMethod === "e-money" && (
                    <>
                      <TextField
                        label="e-Money Number"
                        value={eMoneyNumber}
                        onChange={setEMoneyNumber}
                        errorMsg=""
                      />
                      <TextField
                        label="e-Money PIN"
                        value={eMoneyPin}
                        onChange={setEMoneyPin}
                        errorMsg=""
                      />
                    </>
                  )}
                </div>

                {paymentMethod === "cash" && (
                  <div className="mt-8 flex gap-8">
                    <div className="shrink-0">
                      <Image
                        src="/assets/checkout/icon-cash-on-delivery.svg"
                        alt=""
                        width={48}
                        height={48}
                      />
                    </div>
                    <p className="text-[15px] text-black/50 leading-[25px]">
                      The 'Cash on Delivery' option enables you to pay in cash
                      when our delivery courier arrives at your residence. Just
                      make sure your address is correct so that your order will
                      not be cancelled.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:w-[350px] xl:w-[381px] bg-white rounded-lg p-6 md:p-8 lg:p-8 h-fit">
              <h6 className="mb-8">SUMMARY</h6>

              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-light shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-bold">{item.shortName}</p>
                      <p className="text-[14px] text-black/50 font-bold">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-[15px] text-black/50 font-bold">
                      x{item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-black/50 uppercase">
                    TOTAL
                  </span>
                  <span className="text-[18px] font-bold">
                    $ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-black/50 uppercase">
                    SHIPPING
                  </span>
                  <span className="text-[18px] font-bold">$ {shipping}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-black/50 uppercase">
                    VAT (INCLUDED)
                  </span>
                  <span className="text-[18px] font-bold">
                    $ {vat.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-[15px] text-black/50 uppercase">
                  GRAND TOTAL
                </span>
                <span className="text-[18px] font-bold text-primary">
                  $ {grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                CONTINUE & PAY
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Footer />

      {/* Success Modal */}
      <CheckoutSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        cartItems={cartItems}
        grandTotal={grandTotal}
      />
    </div>
  );
};

export default CheckoutPage;
