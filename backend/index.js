import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Serve static files FIRST

    app.use(cors({ origin: "http://localhost:5173", credentials: true })); // THEN apply CORS

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.use(cors({ origin: "http://localhost:5173", credentials: true })); // CORS for development
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});