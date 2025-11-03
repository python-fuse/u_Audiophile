// import { Resend } from "resend";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { generateOrderConfirmationHTML } from "@/lib/email/templates/orderConfirmation";

// RESEND IMPLEMENTATION (Commented out - may use later)
// const resend = new Resend(process.env.RESEND_API_KEY);

// NODEMAILER IMPLEMENTATION
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderNumber,
      customerName,
      customerEmail,
      orderDate,
      items,
      subtotal,
      shipping,
      vat,
      grandTotal,
      shippingAddress,
      shippingCity, // true for 465, false for other ports
      shippingZipCode,
      shippingCountry,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!orderNumber || !customerEmail || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert relative image URLs to absolute URLs
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";

    const itemsWithAbsoluteUrls = items.map((item: any) => ({
      ...item,
      image: item.image.startsWith("http")
        ? item.image
        : `${baseUrl}${item.image}`,
    }));

    // Generate HTML email
    const emailHTML = generateOrderConfirmationHTML({
      orderNumber,
      customerName,
      customerEmail,
      orderDate,
      items: itemsWithAbsoluteUrls,
      subtotal,
      shipping,
      vat,
      grandTotal,
      shippingAddress,
      shippingCity,
      shippingZipCode,
      shippingCountry,
      paymentMethod,
    });

    // RESEND IMPLEMENTATION (Commented out)
    // const { data, error } = await resend.emails.send({
    //   from: "Audiophile <onboarding@resend.dev>",
    //   to: [customerEmail],
    //   subject: `Order Confirmation - ${orderNumber}`,
    //   html: emailHTML,
    // });
    //
    // if (error) {
    //   console.error("Error sending email:", error);
    //   if (error.name === "validation_error") {
    //     console.log("Note: Using onboarding@resend.dev can only send to your Resend account email.");
    //     console.log("To send to any email, verify a domain at resend.com/domains");
    //     return NextResponse.json(
    //       { success: true, warning: "Email not sent - domain verification required", orderNumber },
    //       { status: 200 }
    //     );
    //   }
    //   return NextResponse.json(
    //     { error: "Failed to send email", details: error },
    //     { status: 500 }
    //   );
    // }
    // return NextResponse.json({ success: true, messageId: data?.id }, { status: 200 });

    // NODEMAILER IMPLEMENTATION
    try {
      const info = await transporter.sendMail({
        from: `"Audiophile" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - ${orderNumber}`,
        html: emailHTML,
      });

      console.log("Email sent successfully:", info.messageId);
      return NextResponse.json(
        { success: true, messageId: info.messageId },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email", details: emailError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in send-order-confirmation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
