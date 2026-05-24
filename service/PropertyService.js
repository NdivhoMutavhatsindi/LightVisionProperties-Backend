import { PropertyRepository } from "../repository/PropertyRepository.js";
import { UploadService } from "./UploadService.js";

export const PropertyService = {
  getAll(query = {}) {
    const filter = {};
    if (query.status) filter.status = query.status;
    if (query.location) filter.location = query.location;
    if (query.propertyType) filter.property_type = query.propertyType;
    return PropertyRepository.findAll(filter);
  },
  getById(propertyId) {
    return PropertyRepository.findById(propertyId);
  },
  async create(data, imageFiles = []) {
    const images = await Promise.all(
      imageFiles.map(async (file, index) => {
        const result = await UploadService.uploadImage(file.buffer, file.filename);
        return {
          image_url: result.secure_url || result.url,
          is_primary: index === 0,
          display_order: index,
        };
      }),
    );

    const { images: _images, agentId, ...props } = data;

    return PropertyRepository.create({ ...props, images });
  },
  update(propertyId, data) {
    return PropertyRepository.update(propertyId, data);
  },
  delete(propertyId) {
    return PropertyRepository.delete(propertyId);
  },
};
