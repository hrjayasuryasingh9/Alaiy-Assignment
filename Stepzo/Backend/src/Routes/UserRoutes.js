import express from "express";
import * as userController from "../Controllers/userController.js";

const router = express.Router();

router.post("/signup", userController.signUpUser);

export default router;
