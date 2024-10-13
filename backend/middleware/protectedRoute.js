import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) => {
  try {
    //get the cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "You are not authenticated." });
    }
    //check the cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not Found" });
    }
    //set req to user
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
export default protectedRoute;
