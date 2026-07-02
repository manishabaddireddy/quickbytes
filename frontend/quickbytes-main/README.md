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
## 📁 Project Structure

```text
Chinnu/
├── backend/                         # Express + TypeScript API
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema/
│   │   │   │   ├── index.ts
│   │   │   │   ├── users.ts
│   │   │   │   ├── restaurants.ts
│   │   │   │   ├── menuItems.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── orderItems.ts
│   │   │   │   └── seatBookings.ts
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── menuItems.ts
│   │   │   ├── orders.ts
│   │   │   ├── restaurants.ts
│   │   │   ├── seatBookings.ts
│   │   │   └── users.ts
│   │   ├── types/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── drizzle.config.ts
│   ├── seed.ts
│   ├── .env.example
│   └── package.json
├── frontend/
|   ├── quickbytes-main/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CategoryTabs.jsx
│   │   │   ├── FoodGrid.jsx
│   │   │   ├── FoodModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SeatBooking.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   ├── OrderTrackingPage.jsx
│   │   │   └── WelcomePage.jsx
│   │   ├── data/
│   │   │   └── menuItems.js
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore

## ⚙️ Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- [Git](https://git-scm.com/)
- npm (comes with Node.js)
---
