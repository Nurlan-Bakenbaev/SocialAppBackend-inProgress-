import express from "express";
import {
  getMyUser,
  login,
  logout,
  signup,
} from "../controllers/authController.js";
import protectedRoute from "../middleware/protectedRoute.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.get("/getme", protectedRoute, getMyUser);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);
