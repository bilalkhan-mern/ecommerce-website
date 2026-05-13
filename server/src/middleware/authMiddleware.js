import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(request, response, next) {
  try {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return response.status(401).json({ message: "Authorization token missing." });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return response.status(401).json({ message: "User not found." });
    }

    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({ message: "Invalid or expired token." });
  }
}
