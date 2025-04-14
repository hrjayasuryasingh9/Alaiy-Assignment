import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "www.smdaffan5.www@gmail.com",
    pass: process.env.MAILER,
  },
});

const signUpUser = async (req, res) => {};

const JWT_SECRET = process.env.JWT_SECRET;

export { signUpUser };
