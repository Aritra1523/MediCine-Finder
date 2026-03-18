import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import pharmacistRoutes from "./routes/pharmacist.js";
import medicineRoutes from "./routes/medicine.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pharmacist", pharmacistRoutes);
app.use("/api/medicines", medicineRoutes);
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
