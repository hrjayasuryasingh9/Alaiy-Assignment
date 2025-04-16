// api/index.js
import dotenv from "dotenv";
dotenv.config();

import serverless from "serverless-http";
import app from "../src/app.js";

export const handler = serverless(app);
