import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { seedProducts } from "./data/products.js";
import Product from "./models/Product.js";

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
