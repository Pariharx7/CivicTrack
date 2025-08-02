import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);


// POST /api/auth/register
router.post("/login", loginUser);




// POST /api/auth/register
router.post("/logout", VerifyJWT, logoutUser);


export default router;


