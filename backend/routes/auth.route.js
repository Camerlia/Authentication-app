import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	// checkAuth,
} from "../controller/auth.controller.js";


const router = express.Router();

router.get( "/verifyToken", );

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;