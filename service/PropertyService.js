import { PropertyRepository } from "../repository/PropertyRepository.js";

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
  create(data) {
    return PropertyRepository.create(data);
  },
  update(propertyId, data) {
    return PropertyRepository.update(propertyId, data);
  },
  delete(propertyId) {
    return PropertyRepository.delete(propertyId);
  },
};
