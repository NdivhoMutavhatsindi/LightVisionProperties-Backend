import { CareerRepository } from "../repository/CareerRepository.js";

export const CareerService = {
  getAll() {
    return CareerRepository.findAll();
  },
  getById(careerId) {
    return CareerRepository.findById(careerId);
  },
  create(data) {
    return CareerRepository.create(data);
  },
  update(careerId, data) {
    return CareerRepository.update(careerId, data);
  },
  delete(careerId) {
    return CareerRepository.delete(careerId);
  },
};
