import jwt from "jsonwebtoken";
import * as userServices from "../Services/userServices.js";

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized, please Login" });
  }

  try {
    const email = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userServices.getuserdata(email.email);
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      is_verified: user.is_verified,
      profile_pic: user.profile_pic,
      address: user.address,
      created_on: user.created_on,
    };
    req.user = data;
    next();
  } catch (error) {
    res.status(402).json({ message: "Internal server error" });
  }
};

export { protectRoute };
