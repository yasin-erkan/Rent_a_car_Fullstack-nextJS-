# 🚗 DriveWay - Modern Car Rental Platform

A professional, full-stack car rental application built with Next.js 14, React 18, MongoDB, and Stripe payments.

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635bff?logo=stripe)](https://stripe.com/)

---

## 🎥 Demo Video

> **Click to watch the full application demo:**

https://github.com/user-attachments/assets/your-video-id-here

_Upload your demo video to GitHub and replace the URL above_

---

## ✨ Features

- 🚗 **Browse 20+ Vehicles** - Detailed specs, multiple angles, real-time search
- 💳 **Secure Payments** - Stripe integration with order tracking
- 🔐 **Authentication** - NextAuth with user profiles and reviews
- 📱 **Responsive Design** - Mobile-first, modern UI with Tailwind CSS
- ⭐ **Reviews & Ratings** - User feedback system
- 🎨 **Modern UI** - Gradient themes, animations, glassmorphism effects

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yasin-erkan/Rent_a_car_Fullstack-nextJS-.git
cd Rent_a_car_Fullstack-nextJS-

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI, NextAuth, and Stripe keys

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

---

## 🛠️ Tech Stack

| Layer        | Technologies                                       |
| ------------ | -------------------------------------------------- |
| **Frontend** | Next.js 14 • React 18 • TypeScript • Tailwind CSS  |
| **Backend**  | MongoDB • Mongoose • Next.js API Routes            |
| **Auth**     | NextAuth.js • JWT • Bcrypt                         |
| **Payments** | Stripe Checkout • Webhooks                         |
| **UI/UX**    | Lucide Icons • Gradient Themes • Responsive Design |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # Backend API routes
│   ├── cars/             # Car listing & detail pages
│   ├── auth/             # Login & register
│   └── success/          # Payment confirmation
├── components/           # Reusable UI components
├── lib/
│   ├── models/           # MongoDB schemas
│   ├── services/         # Business logic
│   └── utils.ts          # Helper functions
└── types/                # TypeScript definitions
```

---

## 🎨 Key Updates (Version 2.0)

### Design Overhaul

- ✅ Rebranded to DriveWay with blue-cyan gradient theme
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Modern components with animations and hover effects

### UX Improvements

- ✅ Fixed form icon positioning and input styling
- ✅ Enhanced search with real-time filtering
- ✅ Improved booking flow with validation
- ✅ Smooth image galleries with multiple angles

### Technical

- ✅ Stripe payment integration (USD currency)
- ✅ Dynamic car images via imagin.studio API
- ✅ Order tracking and history
- ✅ Review system with star ratings

---

## 📝 Environment Variables

Create a `.env.local` file:

```bash
# Database
MONGO_URI=your_mongodb_connection_string

# NextAuth
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🚧 Roadmap

- [ ] Admin dashboard for car management
- [ ] Advanced filters (price, year, mileage)
- [ ] Email notifications
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Car comparison feature

---

## 👤 Author

**Yasin Erkan**

- GitHub: [@yasin-erkan](https://github.com/yasin-erkan)

---

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

---

<div align="center">
  
### ⭐ Star this repo if you find it helpful!

**Built with ❤️ using Next.js, React, and MongoDB**

</div>
