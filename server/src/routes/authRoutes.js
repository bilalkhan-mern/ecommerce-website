import bcrypt from "bcryptjs";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: "Please fill all fields." });
    }

    if (password.length < 6) {
      return response.status(400).json({ message: "Password should be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return response.status(400).json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    response.status(201).json({
      message: "Registration successful.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    response.status(500).json({ message: "Registration failed." });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Please enter email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    response.json({
      message: "Login successful.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    response.status(500).json({ message: "Login failed." });
  }
});

router.get("/me", protect, async (request, response) => {
  response.json({
    user: request.user
  });
});

export default router;
