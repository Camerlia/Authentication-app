import express from "express";
import { login, logout, signup } from "../controller/auth.controller";

const router = express.Router();
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;