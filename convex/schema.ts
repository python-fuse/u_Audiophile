import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer info
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),

    // Shipping details
    shippingAddress: v.string(),
    shippingCity: v.string(),
    shippingZipCode: v.string(),
    shippingCountry: v.string(),

    // Payment info
    paymentMethod: v.string(), // "e-money" | "cash"

    // Order items
    items: v.array(
      v.object({
        id: v.number(),
        slug: v.string(),
        name: v.string(),
        shortName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
        category: v.string(),
      })
    ),

    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),

    // Order metadata
    orderNumber: v.string(),
    status: v.string(), // "pending" | "processing" | "shipped" | "delivered"
    createdAt: v.number(),
  })
    .index("by_email", ["customerEmail"])
    .index("by_order_number", ["orderNumber"])
    .index("by_created_at", ["createdAt"]),
});
