import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notificationsController.js";

export const notificationsRoutes = express.Router();
notificationsRoutes.get("/notify", protectedRoute, getNotifications);
notificationsRoutes.delete("/delete", protectedRoute, deleteNotifications);
