import express from "express";
import * as productsController from "../Controllers/productsController.js";

const router = express.Router();

router.get("/getproducts", productsController.getProducts);

export default router;
