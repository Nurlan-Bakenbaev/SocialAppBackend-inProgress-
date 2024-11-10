import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  commentOnPost,
  createPost,
  deletedComment,
  deletePost,
  getAllikedPosts,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/postControllers.js";

export const postRoutes = express.Router();

postRoutes.get("/all", getAllPosts);
postRoutes.get("/user/:username", getUserPosts);
postRoutes.get("/following", protectedRoute, getFollowingPosts);
postRoutes.get("/likedposts/:id", getAllikedPosts);
postRoutes.post("/create", protectedRoute, createPost);
postRoutes.post("/like/:id", protectedRoute, likeUnlikePost);
postRoutes.post("/comment/:id", protectedRoute, commentOnPost);
postRoutes.delete("/delete/:id", protectedRoute, deletePost);

postRoutes.delete("/comment/:postId/:id", protectedRoute, deletedComment);

