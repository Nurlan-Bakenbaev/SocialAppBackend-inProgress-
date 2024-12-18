import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { authRoutes } from "./routes/authRoutes.js";
import { connection } from "./db/db.js";
import { postRoutes } from "./routes/postRoutes.js";
import { notificationsRoutes } from "./routes/notificationsRoutes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://social-app-backend-in-progress.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Middleware
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
  res.status(200).json("You are connected to Post App backend!");
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
