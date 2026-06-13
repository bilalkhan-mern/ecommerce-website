import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const query = {};

    if (request.query.category) {
      query.category = request.query.category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    response.json({ products });
  } catch (error) {
    response.status(500).json({ message: "Could not fetch products." });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);

    if (!product) {
      return response.status(404).json({ message: "Product not found." });
    }

    response.json({ product });
  } catch (error) {
    response.status(500).json({ message: "Could not fetch product." });
  }
});

export default router;
