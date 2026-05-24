import { cloudinaryClient } from "../config/cloudinary.js";

export const UploadService = {
  async uploadImage(fileBuffer, fileName) {
    return new Promise((resolve, reject) => {
      const stream = cloudinaryClient.uploader.upload_stream(
        { folder: "lightvision", resource_type: "image", public_id: fileName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.end(fileBuffer);
    });
  },
};
