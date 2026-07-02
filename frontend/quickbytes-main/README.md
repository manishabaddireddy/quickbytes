# 🍔 QuickBytes — Cloud-Native Food Delivery App

> A full-stack food delivery web application built as a cloud computing project.  
> Supports delivery ordering, dine-in seat booking, real-time order tracking, and admin management.

---

## 📸 Features

| Feature | Description |
|---------|-------------|
| 🍕 Browse Menu | Filter food items by category (Burgers, Pizzas, Drinks, etc.) |
| 🛒 Shopping Cart | Add, remove, and adjust item quantities |
| 💳 Checkout | Simulated UPI/PhonePe payment flow |
| 📦 Order Tracking | Real-time status updates every 5 seconds |
| 🪑 Seat Booking | Reserve dine-in seats with live availability |
| 🛠 Admin Panel | Look up any order and update its delivery status |
| 🔐 Auth | JWT-based register/login with protected routes |

---

## 🏗 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Lucide React | Icons |
| Fetch API | HTTP requests to backend |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js 20 | Runtime |
| Express 5 | Web framework |
| TypeScript | Type safety |
| Drizzle ORM | Database queries & migrations |
| PostgreSQL | Relational database |
| Zod | Request validation |
| JWT (jsonwebtoken) | Authentication tokens |
| bcrypt | Password hashing |

---

## 📁 Project Structure

QuickBytes/
├── backend/ # Express API server
│ ├── src/
│ │ ├── db/
│ │ │ ├── schema/
│ │ │ │ ├── index.ts # Barrel export
│ │ │ │ ├── users.ts # Users table
│ │ │ │ ├── restaurants.ts # Restaurants table
│ │ │ │ ├── menuItems.ts # Menu items table
│ │ │ │ ├── orders.ts # Orders table
│ │ │ │ ├── orderItems.ts # Order items table
│ │ │ │ └── seatBookings.ts # Seat bookings table
│ │ │ └── index.ts # Drizzle DB instance
│ │ ├── middleware/
│ │ │ └── authMiddleware.ts # JWT verification
│ │ ├── routes/
│ │ │ ├── auth.ts # /api/auth/*
│ │ │ ├── menuItems.ts # /api/menu-items/*
│ │ │ ├── orders.ts # /api/orders/*
│ │ │ ├── restaurants.ts # /api/restaurants/*
│ │ │ ├── seatBookings.ts # /api/seats/*
│ │ │ └── users.ts # /api/users/*
│ │ ├── types/
│ │ ├── app.ts # Express app setup, CORS
│ │ └── index.ts # Server entry point
│ ├── drizzle.config.ts
│ ├── seed.ts # DB seed script
│ ├── .env # Environment variables (not committed)
│ ├── .env.example
│ └── package.json
│
└── quickbytes-main/ # React + Vite frontend
├── src/
│ ├── components/
│ │ ├── AuthModal.jsx # Login/Register modal
│ │ ├── Cart.jsx # Shopping cart sidebar
│ │ ├── CategoryTabs.jsx # Menu category filter tabs
│ │ ├── FoodGrid.jsx # Grid of food cards
│ │ ├── FoodModal.jsx # Food item detail popup
│ │ ├── Footer.jsx
│ │ ├── Hero.jsx
│ │ ├── Logo.jsx
│ │ ├── Navbar.jsx
│ │ ├── SeatBooking.jsx # Dine-in seat selector
│ │ └── Sidebar.jsx # Mode navigation
│ ├── pages/
│ │ ├── AdminPage.jsx # Admin order management
│ │ ├── CheckoutPage.jsx # Payment simulation
│ │ ├── MenuPage.jsx # Main menu + cart/seats
│ │ ├── OrderConfirmationPage.jsx
│ │ ├── OrderTrackingPage.jsx # Live order tracking
│ │ └── WelcomePage.jsx # Landing / mode selection
│ ├── data/
│ │ └── menuItems.js # Currency formatter
│ ├── App.jsx # Root component, state & routing
│ ├── api.js # All API calls
│ └── main.jsx
├── .env # VITE_API_URL (not committed)
├── .env.example
└── package.json

## ⚙️ Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- [Git](https://git-scm.com/)
- npm (comes with Node.js)
---
