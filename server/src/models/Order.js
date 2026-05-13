import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    image: String,
    quantity: Number,
    price: Number
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    note: {
      type: String,
      default: ""
    },
    items: {
      type: [orderItemSchema],
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      default: "Manual confirmation only"
    },
    status: {
      type: String,
      default: "Pending Confirmation"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
