import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const query = {};

    if (request.query.audience) {
      query.audience = request.query.audience;
    }

    if (request.query.type) {
      query.type = request.query.type;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    response.json({
      count: products.length,
      products
    });
  } catch (error) {
    response.status(500).json({ message: "Could not fetch products." });
  }
});

export default router;
