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
import { useCart } from "@/contexts/CartContext";
import { validateCheckoutForm, type FormErrors } from "@/lib/validation";

const CheckoutPage = () => {
  const { items, getSubtotal, getShipping, getVAT, getGrandTotal, clearCart } =
    useCart();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cash">(
    "e-money"
  );
  const [eMoneyNumber, setEMoneyNumber] = useState("");
  const [eMoneyPin, setEMoneyPin] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Calculate totals from cart
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const vat = getVAT();
  const grandTotal = getGrandTotal();

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Validate specific field on blur
    validateField(fieldName);
  };

  const validateField = (fieldName: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (!name.trim()) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = "Wrong format";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!phone.trim()) {
          newErrors.phone = "Phone is required";
        } else if (phone.replace(/\D/g, "").length < 10) {
          newErrors.phone = "Wrong format";
        } else {
          delete newErrors.phone;
        }
        break;
      case "address":
        if (!address.trim()) {
          newErrors.address = "Address is required";
        } else {
          delete newErrors.address;
        }
        break;
      case "zipCode":
        if (!zipCode.trim()) {
          newErrors.zipCode = "ZIP code is required";
        } else if (zipCode.trim().length < 3) {
          newErrors.zipCode = "Wrong format";
        } else {
          delete newErrors.zipCode;
        }
        break;
      case "city":
        if (!city.trim()) {
          newErrors.city = "City is required";
        } else {
          delete newErrors.city;
        }
        break;
      case "country":
        if (!country.trim()) {
          newErrors.country = "Country is required";
        } else {
          delete newErrors.country;
        }
        break;
      case "eMoneyNumber":
        if (paymentMethod === "e-money") {
          if (!eMoneyNumber.trim()) {
            newErrors.eMoneyNumber = "e-Money number is required";
          } else {
            const digitsOnly = eMoneyNumber.replace(/\s/g, "");
            if (!/^\d+$/.test(digitsOnly) || digitsOnly.length < 9) {
              newErrors.eMoneyNumber = "Wrong format";
            } else {
              delete newErrors.eMoneyNumber;
            }
          }
        }
        break;
      case "eMoneyPin":
        if (paymentMethod === "e-money") {
          if (!eMoneyPin.trim()) {
            newErrors.eMoneyPin = "PIN is required";
          } else if (!/^\d{4}$/.test(eMoneyPin)) {
            newErrors.eMoneyPin = "Wrong format";
          } else {
            delete newErrors.eMoneyPin;
          }
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if cart is empty
    if (items.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    // Validate form
    const validationResult = validateCheckoutForm({
      name,
      email,
      phone,
      address,
      zipCode,
      city,
      country,
      paymentMethod,
      eMoneyNumber: paymentMethod === "e-money" ? eMoneyNumber : undefined,
      eMoneyPin: paymentMethod === "e-money" ? eMoneyPin : undefined,
    });

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        email: true,
        phone: true,
        address: true,
        zipCode: true,
        city: true,
        country: true,
        eMoneyNumber: true,
        eMoneyPin: true,
      });
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Clear cart after successful checkout
    clearCart();
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setZipCode("");
    setCity("");
    setCountry("");
    setEMoneyNumber("");
    setEMoneyPin("");
    setTouched({});
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
                    onBlur={() => handleBlur("name")}
                    errorMsg={touched.name ? errors.name : ""}
                    placeholder="Alexei Ward"
                  />
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    onBlur={() => handleBlur("email")}
                    errorMsg={touched.email ? errors.email : ""}
                    placeholder="alexei@mail.com"
                  />
                  <TextField
                    label="Phone Number"
                    value={phone}
                    onChange={setPhone}
                    onBlur={() => handleBlur("phone")}
                    errorMsg={touched.phone ? errors.phone : ""}
                    placeholder="+1 202-555-0136"
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
                    onBlur={() => handleBlur("address")}
                    errorMsg={touched.address ? errors.address : ""}
                    placeholder="1137 Williams Avenue"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <TextField
                      label="ZIP Code"
                      value={zipCode}
                      onChange={setZipCode}
                      onBlur={() => handleBlur("zipCode")}
                      errorMsg={touched.zipCode ? errors.zipCode : ""}
                      placeholder="10001"
                    />
                    <TextField
                      label="City"
                      value={city}
                      onChange={setCity}
                      onBlur={() => handleBlur("city")}
                      errorMsg={touched.city ? errors.city : ""}
                      placeholder="New York"
                    />
                  </div>
                  <TextField
                    label="Country"
                    value={country}
                    onChange={setCountry}
                    onBlur={() => handleBlur("country")}
                    errorMsg={touched.country ? errors.country : ""}
                    placeholder="United States"
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
                        onBlur={() => handleBlur("eMoneyNumber")}
                        errorMsg={
                          touched.eMoneyNumber ? errors.eMoneyNumber : ""
                        }
                        placeholder="238521993"
                      />
                      <TextField
                        label="e-Money PIN"
                        value={eMoneyPin}
                        onChange={setEMoneyPin}
                        onBlur={() => handleBlur("eMoneyPin")}
                        errorMsg={touched.eMoneyPin ? errors.eMoneyPin : ""}
                        placeholder="6891"
                        type="password"
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
                {items.map((item) => (
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
        onClose={handleCloseSuccessModal}
        cartItems={items}
        grandTotal={grandTotal}
      />
    </div>
  );
};

export default CheckoutPage;
