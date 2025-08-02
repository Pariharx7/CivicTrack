import Issue from "../models/issue.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";
import path from "path";


// Create a new issue with optional image upload
export const createIssue = asyncHandler(async (req, res) => {
  const { title, description, category, location } = req.body;

  if (!title || !description || !category || !location) {
    throw new ApiError(400, "Title, description, category, and location are required");
  }

  let parsedLocation;
  try {
    parsedLocation = typeof location === "string" ? JSON.parse(location) : location;
    if (!parsedLocation.lat || !parsedLocation.lng) throw new Error();
  } catch {
    throw new ApiError(400, "Location must contain lat and lng");
  }

  const validCategories = [
    "Roads",
    "Lighting",
    "Water Supply",
    "Cleanliness",
    "Public Safety",
    "Obstructions",
  ];
  if (!validCategories.includes(category)) throw new ApiError(400, "Invalid category");

  let photos = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result && result.secure_url) {
        photos.push(result.secure_url);
      } else {
        throw new ApiError(500, "Image upload failed");
      }
    }
    await deleteTempFiles(req.files);
  }

  const issue = await Issue.create({
    title,
    description,
    category,
    location: { type: "Point", coordinates: [parsedLocation.lng, parsedLocation.lat] },
    reportedBy: req.myUser._id,
    imageUrl: photos,
    status: "pending",
  });

  res.status(201).json(new ApiResponse(201, issue, "Issue reported successfully"));
});

export const listIssues = asyncHandler(async (req, res) => {
  const { category, status, page = 1, limit = 20 } = req.query;

  // Build the filter object dynamically
  let filter = {};

  if (category) filter.category = category.trim();
  if (status) filter.status = status.trim();

  // For non-admins show only unflagged issues; admins see all
  // if (!req.myUser || req.myUser.role !== "admin") {
  //   filter.isFlagged = false;
  // }

  // Pagination calculations
  const perPage = parseInt(limit);
  const currentPage = parseInt(page);
  const skip = (currentPage - 1) * perPage;

  // Count total matching documents for pagination info
  const total = await Issue.countDocuments(filter);

  // Query with pagination and sorting
  const issues = await Issue.find(filter)
    .populate("reportedBy", "username fullname avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  // Send paginated response including metadata
  res.json(
    new ApiResponse(200, {
      issues,
      pagination: {
        total,
        perPage,
        currentPage,
        totalPages: Math.ceil(total / perPage),
      },
    }, "Issues fetched successfully")
  );
});


// List nearby issues within radius (3-5km) of user location
export const listNearbyIssues = asyncHandler(async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng) {
    throw new ApiError(400, "Latitude and longitude are required");
  }

  const radiusMeters = radius ? parseFloat(radius) * 1000 : 3000; // default 3 km

  const issues = await Issue.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: radiusMeters,
      },
    },
    isFlagged: false,
  })
    .populate("reportedBy", "username fullname avatar")
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, issues, "Nearby civic issues fetched successfully"));
});

// Get issue details by ID
export const getIssueDetail = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
    .populate("reportedBy", "username fullname avatar");
  if (!issue) throw new ApiError(404, "Issue not found");

  res.json(new ApiResponse(200, issue, "Issue details fetched successfully"));
});

// Update issue status or logs (admin only)
export const updateIssue = asyncHandler(async (req, res) => {
  if (!req.myUser || req.myUser.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }

  const { status, comment } = req.body;
  const validStatuses = ["pending", "in-progress", "resolved"];
  if (!validStatuses.includes(status)) throw new ApiError(400, "Invalid status");

  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new ApiError(404, "Issue not found");

  issue.status = status;
  issue.logs = issue.logs || [];
  issue.logs.push({
    status,
    comment: comment || `Status changed to ${status}`,
    updatedBy: req.myUser._id,
    updatedAt: new Date(),
  });

  await issue.save();

  res.json(new ApiResponse(200, issue, "Issue updated successfully"));
});

// Flag an issue as spam/inappropriate
export const flagIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new ApiError(404, "Issue not found");

  issue.flaggedCount = (issue.flaggedCount || 0) + 1;
  if (issue.flaggedCount >= 3) issue.isFlagged = true;

  await issue.save();

  res.json(new ApiResponse(200, issue, "Issue flagged successfully"));
});

// Delete an issue (admin only)
export const deleteIssue = asyncHandler(async (req, res) => {
  if (!req.myUser || req.myUser.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }

  const issue = await Issue.findByIdAndDelete(req.params.id);
  if (!issue) throw new ApiError(404, "Issue not found");

  res.json(new ApiResponse(200, {}, "Issue deleted successfully"));
});
