import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  followUnFollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from "../controllers/usersControllers.js";
const userRoutes = express.Router();
userRoutes.get("/profile/:username", protectedRoute, getUserProfile);
userRoutes.get("/suggested", getSuggestedUsers);
userRoutes.post("/follow/:id", protectedRoute, followUnFollowUser);
userRoutes.patch("/update/:id", protectedRoute, updateUser);
export default userRoutes;
