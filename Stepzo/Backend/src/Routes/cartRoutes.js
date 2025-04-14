import * as cartController from "../Controllers/cartController.js";
import * as userMiddleware from "../Middlewares/userMiddleware.js";
import express from "express";
const router = express.Router();

router.post(
  "/addtocart",
  userMiddleware.protectRoute,
  cartController.addToCart
);

router.get(
  "/getcartitems",
  userMiddleware.protectRoute,
  cartController.getCartItems
);

router.delete(
  "/deletecartitem/:id",
  userMiddleware.protectRoute,
  cartController.deleteCartItem
);

router.patch(
  "/updatecartitem/:id",
  userMiddleware.protectRoute,
  cartController.updateCartItem
);

export default router;
