import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const getLocalUrl = (req, filename) => {
  const host = process.env.SERVER_BASE_URL ?? `${req.protocol}://${req.get("host")}`;
  return `${host}/uploads/${filename}`;
};

const saveLocalFile = async (req, file) => {
  const extension = path.extname(file.originalname) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.promises.writeFile(filePath, file.buffer);
  return { url: getLocalUrl(req, filename), publicId: filename };
};

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const cloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );

  try {
    if (cloudinaryConfigured) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "lightvision" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(req.file.buffer);
      });
      return res.json({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
    }

    const localResult = await saveLocalFile(req, req.file);
    res.json(localResult);
  } catch (error) {
    console.error("Media upload failed:", error);
    if (!cloudinaryConfigured) {
      try {
        const localResult = await saveLocalFile(req, req.file);
        return res.json(localResult);
      } catch (localError) {
        console.error("Local fallback upload failed:", localError);
      }
    }
    res.status(500).json({ message: "Upload failed", error: error?.message ?? "Unknown error" });
  }
});

export default router;
