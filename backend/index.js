import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { connection } from "./db/db.js";

const app = express();
dotenv.config();
//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: `Page ${req.originalUrl} Not Found ` });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is On "), connection();
});
