import multer from "multer";
import path from "path";

// Multer storage to save files in ./public/temp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Use original filename or add more logic for uniqueness if needed
    cb(null, file.originalname);
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (.png, .jpg, .jpeg, .gif)"), false);
  }
};

// Multer upload middleware with file limit 3 images per request
export const upload = multer({
  storage: storage,
  limits: { files: 3 }, // Max 3 files
  fileFilter: fileFilter,
});
