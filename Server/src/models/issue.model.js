import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    imageUrl: {
      type: [String], //cloudinary
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

     category: {
    type: String,
    enum: [
      "Roads", "Lighting", "Water Supply", "Cleanliness", "Public Safety", "Obstructions"
    ],
    required: true,
  },
  
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

issueSchema.index({ location: "2dsphere" }); // special type of index designed for geospatial queries

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;