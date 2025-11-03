import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { generateOrderConfirmationHTML } from "@/lib/email/templates/orderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      shippingCity,
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

    // Generate HTML email
    const emailHTML = generateOrderConfirmationHTML({
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
      shippingCity,
      shippingZipCode,
      shippingCountry,
      paymentMethod,
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHTML,
    });

    if (error) {
      console.error("Error sending email:", error);

      // If it's a validation error about email domain, return success anyway
      // since the order was created successfully
      if (error.name === "validation_error") {
        console.log(
          "Note: Using onboarding@resend.dev can only send to your Resend account email."
        );
        console.log(
          "To send to any email, verify a domain at resend.com/domains"
        );
        return NextResponse.json(
          {
            success: true,
            warning: "Email not sent - domain verification required",
            orderNumber,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-order-confirmation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
