"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Button from "@/components/button";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  const order = useQuery(api.orders.getOrderByNumber, {
    orderNumber: orderNumber,
  });

  if (order === undefined) {
    return (
      <div className="min-h-screen bg-light">
        <NavBar />
        <div className="container-p py-20 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-black/50">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="min-h-screen bg-light">
        <NavBar />
        <div className="container-p py-20">
          <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-black/50 mb-8">
              We couldn't find an order with number: {orderNumber}
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <NavBar />

      <div className="container-p py-8 md:py-12 lg:py-16">
        <Link
          href="/"
          className="inline-block text-black/50 hover:text-primary transition-colors mb-6"
        >
          Go Back
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Order Details
              </h1>
              <p className="text-black/50">Order #{order.orderNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={`${getStatusColor(
                  order.status
                )} px-4 py-2 rounded-full text-sm font-bold uppercase text-center`}
              >
                {order.status}
              </span>
              <p className="text-sm text-black/50 text-center">{orderDate}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Items Ordered</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-6 border-b border-black/10 last:border-0"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-light shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[15px] mb-1">
                      {item.shortName}
                    </h3>
                    <p className="text-sm text-black/50 font-bold">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-black/50 font-bold mb-1">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold">
                      $ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-black/50 uppercase text-sm">
                    Subtotal
                  </span>
                  <span className="font-bold">
                    $ {order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50 uppercase text-sm">
                    Shipping
                  </span>
                  <span className="font-bold">$ {order.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50 uppercase text-sm">
                    VAT (Included)
                  </span>
                  <span className="font-bold">
                    $ {order.vat.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-black/10 pt-3 flex justify-between">
                  <span className="text-black/50 uppercase text-sm">
                    Grand Total
                  </span>
                  <span className="font-bold text-lg text-primary">
                    $ {order.grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Customer Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-black/50 uppercase mb-1">Name</p>
                  <p className="font-bold">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50 uppercase mb-1">Email</p>
                  <p className="font-bold break-all">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50 uppercase mb-1">Phone</p>
                  <p className="font-bold">{order.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <div className="text-black/50 leading-relaxed">
                <p>{order.customerName}</p>
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}, {order.shippingZipCode}
                </p>
                <p>{order.shippingCountry}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <p className="text-black/50">
                {order.paymentMethod === "e-money"
                  ? "e-Money"
                  : "Cash on Delivery"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto text-md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
