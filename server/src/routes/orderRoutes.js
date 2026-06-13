import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", protect, async (request, response) => {
  try {
    const { productId } = request.body;

    if (!productId) {
      return response.status(400).json({ message: "Product details are required." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return response.status(404).json({ message: "Product not found." });
    }

    const order = await Order.create({
      userId: request.user._id,
      productId: product._id,
      productName: product.name,
      price: product.price,
      orderDate: new Date()
    });

    response.status(201).json({
      message: "Order placed successfully.",
      order
    });
  } catch (error) {
    response.status(500).json({ message: "Order save failed." });
  }
});

router.get("/user", protect, async (request, response) => {
  try {
    const orders = await Order.find({ userId: request.user._id })
      .populate("productId", "name image price description")
      .sort({ orderDate: -1 });

    response.json({ count: orders.length, orders });
  } catch (error) {
    response.status(500).json({ message: "Could not fetch orders." });
  }
});

export default router;
