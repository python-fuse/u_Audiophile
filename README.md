# Audiophile E-Commerce Website

A fully functional e-commerce website for premium audio equipment, built with Next.js 15, TypeScript, Tailwind CSS, and Convex backend.

![Audiophile Homepage](https://ucodesphile.netlify.app/assets/home/desktop/image-hero.jpg)

## 🚀 Features

### Core Functionality

- **Dynamic Product Pages**: Browse headphones, speakers, and earphones with detailed product information
- **Shopping Cart**: Add, remove, update quantities with real-time cart management
- **Checkout System**: Complete checkout flow with form validation
- **Order Management**: Convex-powered backend for order processing
- **Email Notifications**: Automated order confirmation emails with Nodemailer
- **Order Tracking**: View order details via unique order numbers

### Technical Highlights

- **Next.js 15+**: App Router, Server Components, and async dynamic params
- **TypeScript**: Full type safety across the codebase
- **Tailwind CSS v4**: Modern styling with canonical classes
- **Convex Backend**: Serverless database for orders
- **React Context API**: Global cart state management with localStorage persistence
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Form Validation**: Custom validators for email, phone, ZIP code, and e-Money

## 📦 Tech Stack

- **Framework**: Next.js 15.0.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Convex (serverless)
- **Email**: Nodemailer (Gmail SMTP)
- **State Management**: React Context API
- **Image Optimization**: Next.js Image Component

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Gmail account (for email sending)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/python-fuse/u_audiophile.git
cd u_audiophile
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# Convex Backend
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Application URL (for emails)
DEPLOYED_NETLIFY_URL=https://your-domain.netlify.app

# Email Service (Nodemailer - Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Optional: Resend API (alternative email service)
RESEND_API_KEY=your-resend-api-key
```

4. **Set up Convex**

```bash
npx convex dev
```

This will:

- Create a new Convex project (if needed)
- Generate your `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`
- Start watching for schema changes

5. **Set up Gmail App Password**

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

6. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── send-order-confirmation/    # Email API route
│   ├── checkout/                       # Checkout page
│   ├── earphones/                      # Earphones category & products
│   ├── headphones/                     # Headphones category & products
│   ├── speakers/                       # Speakers category & products
│   ├── orders/[orderNumber]/          # Order details page
│   └── page.tsx                        # Homepage
├── components/
│   ├── cart/                           # Cart modal
│   ├── checkout/                       # Checkout success modal
│   ├── form/                           # Form input components
│   ├── home/                           # Homepage sections
│   ├── product/                        # Product components
│   └── shared/                         # Navbar, Footer
├── contexts/
│   └── CartContext.tsx                 # Global cart state
├── convex/
│   ├── orders.ts                       # Order mutations & queries
│   └── schema.ts                       # Database schema
├── lib/
│   ├── products.ts                     # Product utilities
│   ├── validation.ts                   # Form validators
│   └── email/
│       └── templates/
│           └── orderConfirmation.ts    # Email template
└── public/
    └── assets/                         # Product images & data
        └── db.json                     # Product database
```

## 🎨 Design

Built from the [Frontend Mentor - Audiophile e-commerce website challenge](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx)

### Design Features

- Mobile-first responsive design (375px, 768px, 1440px breakpoints)
- Custom typography with Manrope font
- Accessible color palette
- Smooth hover states and transitions
- Optimized images for all device sizes

## 🔑 Key Features Explained

### Cart Management

- Persistent cart using localStorage
- Add, update, remove items
- Real-time price calculations (subtotal, shipping, VAT, grand total)
- Cart modal accessible from any page

### Checkout Flow

1. Form validation (billing, shipping, payment details)
2. Order creation in Convex database
3. Email confirmation sent via Nodemailer
4. Success modal with order number
5. Cart cleared after successful order

### Order Tracking

- Unique order numbers (format: ORD-timestamp-random)
- Email contains "View Your Order" CTA
- Order details page shows full order information
- Order status tracking (pending, processing, shipped, delivered)

### Email System

- HTML email templates with inline styles
- Responsive email design
- Order summary with itemized list
- Absolute URLs for images (works in all email clients)
- Professional branding

## 🚢 Deployment

### Netlify Deployment

1. **Build settings**

```bash
Build command: pnpm build
Publish directory: .next
```

2. **Environment variables**
   Add all variables from `.env.local` to Netlify dashboard

3. **Deploy Convex**

```bash
npx convex deploy
```

Update `NEXT_PUBLIC_CONVEX_URL` with production URL

### Vercel Deployment

1. **Import repository** to Vercel
2. **Add environment variables** in project settings
3. **Deploy** - Vercel auto-detects Next.js

## 🧪 Testing

Test the checkout flow:

1. Add products to cart
2. Fill out checkout form
3. Submit order
4. Check email for order confirmation
5. Click "View Your Order" in email
6. Verify order details page

## 📝 Environment Variables Reference

| Variable                 | Description                 | Required |
| ------------------------ | --------------------------- | -------- |
| `CONVEX_DEPLOYMENT`      | Convex deployment name      | Yes      |
| `NEXT_PUBLIC_CONVEX_URL` | Convex API endpoint         | Yes      |
| `DEPLOYED_NETLIFY_URL`   | Production URL for emails   | Yes      |
| `EMAIL_HOST`             | SMTP server host            | Yes      |
| `EMAIL_PORT`             | SMTP server port            | Yes      |
| `EMAIL_SECURE`           | Use SSL/TLS                 | Yes      |
| `EMAIL_USER`             | Email account               | Yes      |
| `EMAIL_PASS`             | Email password/app password | Yes      |
| `RESEND_API_KEY`         | Resend API key (optional)   | No       |

## 🐛 Common Issues

### Email Images Not Showing

- Ensure `DEPLOYED_NETLIFY_URL` is set correctly (no trailing slash)
- Check that images are publicly accessible
- Verify email API route is converting relative URLs to absolute URLs

### Convex Connection Issues

- Run `npx convex dev` in a separate terminal
- Verify `NEXT_PUBLIC_CONVEX_URL` is correct
- Check Convex dashboard for deployment status

### Cart Not Persisting

- Check browser localStorage is enabled
- Verify CartContext is wrapping the app in `layout.tsx`

## 📄 License

This project is open source (Excluding HNG INTERNS) and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Umar Muktar**

- GitHub: [@python-fuse](https://github.com/python-fuse)
- Youtube [@uCodes880](https://youtube.com/@uCodes880)
- Live Demo: [https://ucodesphile.netlify.app](https://ucodesphile.netlify.app)

## 🙏 Acknowledgments

- [HNG Frontend Mentors](https://hng.tech) for the design challenge
- [Convex](https://convex.dev) for the serverless backend
- [Next.js](https://nextjs.org) team for the amazing framework
