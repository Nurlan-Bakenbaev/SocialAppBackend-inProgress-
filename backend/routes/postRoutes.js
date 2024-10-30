import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllikedPosts,
  getAllPosts,
  likeUnlikePost,
} from "../controllers/postControllers.js";

export const postRoutes = express.Router();

postRoutes.get("/all", getAllPosts);
postRoutes.get("/likedposts/:id", getAllikedPosts);
postRoutes.post("/create", protectedRoute, createPost);
postRoutes.post("/like/:id", protectedRoute, likeUnlikePost);
postRoutes.post("/comment/:id", protectedRoute, commentOnPost);
postRoutes.delete("/delete/:id", protectedRoute, deletePost);
