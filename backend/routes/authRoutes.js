import express from "express";
import {
  getMyUser,
  logout,
  signin,
  signup,
} from "../controllers/authController.js";
import protectedRoute from "../middleware/protectedRoute.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.get("/getme", protectedRoute, getMyUser);

authRoutes.post("/login", signin);

authRoutes.post("/logout", logout);
