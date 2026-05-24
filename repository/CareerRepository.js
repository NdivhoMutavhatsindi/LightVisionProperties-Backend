import { prisma } from "../config/prisma.js";

export const CareerRepository = {
  findAll() {
    return prisma.careers.findMany({ where: { is_active: true }, orderBy: { created_at: "desc" } });
  },

  findById(careerId) {
    return prisma.careers.findUnique({ where: { career_id: careerId } });
  },

  create(data) {
    return prisma.careers.create({ data });
  },

  update(careerId, data) {
    return prisma.careers.update({ where: { career_id: careerId }, data });
  },

  delete(careerId) {
    return prisma.careers.delete({ where: { career_id: careerId } });
  },
};
