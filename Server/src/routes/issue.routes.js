import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createIssue, listIssues, listNearbyIssues, getIssueDetail, updateIssue, flagIssue, deleteIssue } from "../controllers/Issue.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";

const router = express.Router();



// POST /api/issues/report
router.post(
  "/report",
  VerifyJWT,
  upload.array("photos", 3), 
  createIssue
);


// GET /api/issues/nearby
router.get("/nearby", VerifyJWT, listNearbyIssues);

// GET /api/issues/nearby
router.get("/", listIssues);

// View a single issue by ID
router.get("/:id", VerifyJWT, getIssueDetail);

// Update an issue (admin only, e.g. status, admin logs)
router.patch("/:id", VerifyJWT, authorizeRoles("admin"),  updateIssue);

// Flag an issue as spam/inappropriate
router.post("/:id/flag", VerifyJWT, flagIssue);

// Delete an issue (admin only)
router.delete("/:id", VerifyJWT,authorizeRoles("admin"), deleteIssue);


export default router;