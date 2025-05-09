import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./Routes/UserRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import wishlistRoutes from "./Routes/wishlistRoutes.js";
import paymentsRoutes from "./Routes/paymentsRoutes.js";
import rateLimit from "express-rate-limit";

const app = express();
dotenv.config();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors()
);

app.use("/api/auth", UserRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentsRoutes);

export default app;
