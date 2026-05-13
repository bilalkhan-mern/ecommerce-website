import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    audience: {
      type: String,
      enum: ["men", "women", "kids"],
      required: true
    },
    type: {
      type: String,
      enum: ["shirt", "pant", "tshirt", "blazer", "kurti", "dress", "hoodie", "jacket"],
      required: true
    },
    section: {
      type: String,
      enum: ["formal", "casual", "party", "essentials"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
