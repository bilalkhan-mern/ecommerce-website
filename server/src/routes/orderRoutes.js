import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", protect, async (request, response) => {
  try {
    const { customerName, email, phone, address, items, totalAmount, note, paymentMethod } = request.body;

    if (!customerName || !email || !phone || !address || !items?.length || !totalAmount) {
      return response.status(400).json({ message: "Please fill all required order fields." });
    }

    const order = await Order.create({
      user: request.user._id,
      customerName,
      email,
      phone,
      address,
      items,
      totalAmount,
      note,
      paymentMethod
    });

    response.status(201).json({
      message: "Order placed successfully.",
      order
    });
  } catch (error) {
    response.status(500).json({ message: "Order save failed." });
  }
});

router.get("/my-orders", protect, async (request, response) => {
  try {
    const orders = await Order.find({ user: request.user._id }).sort({ createdAt: -1 });
    response.json({ count: orders.length, orders });
  } catch (error) {
    response.status(500).json({ message: "Could not fetch orders." });
  }
});

export default router;
