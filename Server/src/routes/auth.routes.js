import express from "express";
import { registerUser, loginUser, logoutUser,  refreshAccessToken, getCurrentUser } from "../controllers/auth.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);


// POST /api/auth/register
router.post("/login", loginUser);

// POST /api/auth/register
router.post("/logout", VerifyJWT, logoutUser);

router.post("/refresh-token", refreshAccessToken);

// GET /api/protected/test
router.get("/test", VerifyJWT, (req, res) => {
  res.json(new ApiResponse(200, { user: req.myUser }, "You are authorized!"));
});



export default router;


