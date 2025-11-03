import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Generate a unique order number
 * Format: ORD-TIMESTAMP-RANDOM
 */
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORD-${timestamp}-${random}`;
}

/**
 * Create a new order
 */
export const createOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingCity: v.string(),
    shippingZipCode: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
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
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const orderNumber = generateOrderNumber();
    const createdAt = Date.now();

    const orderId = await ctx.db.insert("orders", {
      ...args,
      orderNumber,
      status: "pending",
      createdAt,
    });

    return {
      orderId,
      orderNumber,
      createdAt,
    };
  },
});

/**
 * Get order by order number
 */
export const getOrderByNumber = query({
  args: {
    orderNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) =>
        q.eq("orderNumber", args.orderNumber)
      )
      .first();

    return order;
  },
});

/**
 * Get all orders by customer email
 */
export const getOrdersByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", args.email))
      .order("desc")
      .collect();

    return orders;
  },
});

/**
 * Get recent orders (for admin/dashboard - optional)
 */
export const getRecentOrders = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_created_at")
      .order("desc")
      .take(limit);

    return orders;
  },
});

/**
 * Update order status (for admin features later)
 */
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: args.status,
    });

    return { success: true };
  },
});
