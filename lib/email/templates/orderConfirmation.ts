interface OrderItem {
  id: number;
  name: string;
  shortName: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmationData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  shippingCountry: string;
  paymentMethod: string;
}

export function generateOrderConfirmationHTML(
  data: OrderConfirmationData
): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #f1f1f1;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="64" style="padding-right: 16px;">
              <img src="${item.image}" alt="${
        item.name
      }" width="64" height="64" style="border-radius: 8px; display: block;" />
            </td>
            <td style="vertical-align: middle;">
              <div style="font-weight: bold; font-size: 15px; color: #000000; margin-bottom: 4px;">
                ${item.shortName}
              </div>
              <div style="font-size: 14px; color: #000000; opacity: 0.5; font-weight: bold;">
                $ ${item.price.toLocaleString()}
              </div>
            </td>
            <td width="60" style="text-align: right; vertical-align: middle;">
              <div style="font-size: 15px; color: #000000; opacity: 0.5; font-weight: bold;">
                x${item.quantity}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${data.orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafafa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">
                AUDIOPHILE
              </h1>
            </td>
          </tr>

          <!-- Success Icon & Title -->
          <tr>
            <td style="padding: 48px 32px 32px; text-align: center;">
              <div style="width: 64px; height: 64px; background-color: #D87D4A; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="font-size: 28px; font-weight: bold; color: #000000; margin: 0 0 16px; letter-spacing: 1px;">
                THANK YOU FOR YOUR ORDER
              </h2>
              <p style="font-size: 15px; color: #000000; opacity: 0.5; margin: 0;">
                Your order has been received and is being processed.
              </p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f1f1f1; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td>
                          <div style="font-size: 13px; color: #000000; opacity: 0.5; font-weight: bold; margin-bottom: 8px;">
                            ORDER NUMBER
                          </div>
                          <div style="font-size: 18px; color: #000000; font-weight: bold;">
                            ${data.orderNumber}
                          </div>
                        </td>
                        <td style="text-align: right;">
                          <div style="font-size: 13px; color: #000000; opacity: 0.5; font-weight: bold; margin-bottom: 8px;">
                            ORDER DATE
                          </div>
                          <div style="font-size: 15px; color: #000000; font-weight: bold;">
                            ${data.orderDate}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #000000; margin: 0 0 16px; letter-spacing: 1.29px;">
                ORDER SUMMARY
              </h3>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${itemsHTML}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #000000; border-radius: 8px; padding: 24px;">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-size: 15px; color: #ffffff; opacity: 0.5; text-transform: uppercase;">
                            TOTAL
                          </span>
                        </td>
                        <td style="text-align: right; padding: 8px 0;">
                          <span style="font-size: 18px; color: #ffffff; font-weight: bold;">
                            $ ${data.subtotal.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-size: 15px; color: #ffffff; opacity: 0.5; text-transform: uppercase;">
                            SHIPPING
                          </span>
                        </td>
                        <td style="text-align: right; padding: 8px 0;">
                          <span style="font-size: 18px; color: #ffffff; font-weight: bold;">
                            $ ${data.shipping}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-size: 15px; color: #ffffff; opacity: 0.5; text-transform: uppercase;">
                            VAT (INCLUDED)
                          </span>
                        </td>
                        <td style="text-align: right; padding: 8px 0;">
                          <span style="font-size: 18px; color: #ffffff; font-weight: bold;">
                            $ ${data.vat.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 0; border-top: 1px solid rgba(255,255,255,0.2);">
                          <span style="font-size: 15px; color: #ffffff; opacity: 0.5; text-transform: uppercase;">
                            GRAND TOTAL
                          </span>
                        </td>
                        <td style="text-align: right; padding: 16px 0 0; border-top: 1px solid rgba(255,255,255,0.2);">
                          <span style="font-size: 18px; color: #D87D4A; font-weight: bold;">
                            $ ${data.grandTotal.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #000000; margin: 0 0 16px; letter-spacing: 1.29px;">
                SHIPPING ADDRESS
              </h3>
              <div style="font-size: 15px; color: #000000; opacity: 0.5; line-height: 25px;">
                ${data.customerName}<br/>
                ${data.shippingAddress}<br/>
                ${data.shippingCity}, ${data.shippingZipCode}<br/>
                ${data.shippingCountry}
              </div>
            </td>
          </tr>

          <!-- Payment Method -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #000000; margin: 0 0 16px; letter-spacing: 1.29px;">
                PAYMENT METHOD
              </h3>
              <div style="font-size: 15px; color: #000000; opacity: 0.5;">
                ${
                  data.paymentMethod === "e-money"
                    ? "e-Money"
                    : "Cash on Delivery"
                }
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 48px; text-align: center;">
              <a href="${
                process.env.DEPLOYED_NETLIFY_URL || "http://localhost:3000"
              }/orders/${
    data.orderNumber
  }" style="display: inline-block; background-color: #D87D4A; color: #ffffff; text-decoration: none; padding: 15px 32px; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-radius: 0;">
                VIEW YOUR ORDER
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #000000; padding: 32px; text-align: center;">
              <p style="font-size: 15px; color: #ffffff; opacity: 0.5; margin: 0 0 16px;">
                Need help with your order?
              </p>
              <p style="font-size: 15px; color: #ffffff; margin: 0;">
                Contact us at <a href="mailto:support@audiophile.com" style="color: #D87D4A; text-decoration: none;">support@audiophile.com</a>
              </p>
              <p style="font-size: 13px; color: #ffffff; opacity: 0.5; margin: 24px 0 0;">
                © 2025 Audiophile. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
