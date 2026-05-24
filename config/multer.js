import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, callback) => {
  const validMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (validMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});

export default upload;
