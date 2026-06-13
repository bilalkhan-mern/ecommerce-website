# Electro Hub

A clean electronics ecommerce website built for a fresher-level MERN project demo. The store focuses on electronics only, with a responsive home page, searchable product listings, product details, login/register screens, and an order flow that saves purchases to the database.

## Features

- Electronics-only home page with hero, featured products, and discount cards
- Product listing page with search, categories, and section-based navigation
- Product detail view with image, price, and purchase button
- Login and register pages with persistent session support
- Buy flow that saves orders after login
- Responsive layout for mobile and desktop

## Folder Structure

```bash
project/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
└── server/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── server.js
```

## Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `server/` and add your MongoDB connection string and JWT secret.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Start the backend

```bash
cd server
npm run dev
```

### 4. Start the frontend

```bash
cd client
npm run dev
```

## Main Pages

- Home
- Products
- Login
- Register
- Success

## Product Experience

- Electronics categories
- Search by product name, brand, description, or category
- Featured discount cards
- Detailed product view
- Buy Now flow after login

## Notes

- Product data is loaded from the backend and shown in clean cards.
- Images are assigned to keep the electronics store visually varied.
- The code stays simple and beginner-friendly.
