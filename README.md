# StyleCart Ecommerce

A beginner-friendly full-stack ecommerce project for shirts and pants across men, women, and kids.

## Tech Stack

- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB with Mongoose

## Project Structure

- `client` - React frontend
- `server` - Express + MongoDB backend

## Features

- Browse products by audience: men, women, kids
- Browse by type: shirts, pants
- Search and featured sections
- Add to cart and update quantity
- Simple checkout form
- No payment gateway
- Order is saved in MongoDB and shown as manual confirmation
- Ready-to-seed demo products

## Run Frontend

```bash
cd client
npm install
npm run dev
```

## Run Backend

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

## MongoDB

Update `MONGO_URI` inside `server/.env` before running the backend.

## Beginner Notes

- Payment integration is intentionally skipped
- Order button saves the order and shows a success message
- You can later add auth, admin panel, and real payment if needed
