import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { authRoutes } from "./routes/authRoutes.js";
import { connection } from "./db/db.js";
import { postRoutes } from "./routes/postRoutes.js";
import {notificationsRoutes} from "./routes/notificationsRoutes.js";

const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.status(200).json("hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: `Page ${req.originalUrl} Not Found ` });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is On "), connection();
});
