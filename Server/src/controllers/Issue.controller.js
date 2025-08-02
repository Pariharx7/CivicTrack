import Issue from "../models/issue.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Assuming this is your util

// Report an Issue 
export const reportIssue = asyncHandler(async (req, res) => {
  const { title, description, category, latitude, longitude } = req.body;

  if (!title || !description || !latitude || !category  || !longitude) {
    throw new ApiError(400, "All fields are required");
  }

  const validCategories = [
    "Roads", "Lighting", "Water Supply", "Cleanliness", "Public Safety", "Obstructions"
  ];

   if (!validCategories.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  if (!req.files) {
    throw new ApiError(400, "Image is required");
  }


 let imageUrl = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadResponse = await uploadOnCloudinary(file.path);
      if (uploadResponse && uploadResponse.secure_url) {
        imageUrl.push(uploadResponse.secure_url);
      } else {
        throw new ApiError(500, "Image upload failed");
      }
    }
  }

  const newIssue = await Issue.create({
    title,
    description,
    category,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    },
    imageUrl,
    reportedBy: req.myUser._id,
  });

  return res.status(201).json(new ApiResponse(201, newIssue, "Issue reported successfully"));
});
