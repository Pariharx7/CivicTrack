import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { reportIssue } from "../controllers/Issue.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();



// POST /api/issues/report
router.post(
  "/report",
  VerifyJWT,
  upload.array("photos", 3), 
  reportIssue
);



export default router;