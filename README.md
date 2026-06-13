# MERN Electronics Ecommerce

A beginner-friendly MERN stack electronics ecommerce project with React, React Router, Tailwind CSS, Node.js, Express.js, MongoDB Atlas, JWT authentication, and bcrypt.

## Features

- Electronics-only storefront
- Dynamic product cards loaded from MongoDB Atlas
- Category and section-based navbar navigation
- Search, featured products, and discount product cards
- Login, register, JWT session persistence
- Buy flow that saves orders in MongoDB Atlas
- Responsive layout for desktop and mobile

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose
- Auth: JWT and bcrypt

## Product Fields

```js
{
  name,
  brand,
  category,
  price,
  oldPrice,
  discount,
  description,
  image
}
```

## Run Locally

### Backend

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

### Frontend

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

## Notes

- Add or edit products in MongoDB Atlas and refresh the UI to see them.
- The project uses simple React hooks only.
- No Redux, no TypeScript, and no advanced architecture were used.
