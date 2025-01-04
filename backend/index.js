import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser())
// Connect to the database before starting the server
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log("server is runing on port", PORT)
})
