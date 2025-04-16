import express from "express";
import * as userMiddleware from "../Middlewares/userMiddleware.js";
import * as paymentController from "../Controllers/paymentController.js";
const router = express.Router();

router.post(
  "/create-checkout-session",
  userMiddleware.protectRoute,
  paymentController.CheckoutPayment
);
router.post("/create-orders", paymentController.getSessionDetails);
router.get(
  "/getorders",
  userMiddleware.protectRoute,
  paymentController.getOrders
);
export default router;
