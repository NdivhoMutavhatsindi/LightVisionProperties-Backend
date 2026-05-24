import { prisma } from "../config/prisma.js";

export const PropertyRepository = {
  findAll(filter = {}) {
    return prisma.properties.findMany({ where: filter, orderBy: { created_at: "desc" } });
  },

  findById(propertyId) {
    return prisma.properties.findUnique({ where: { property_id: propertyId } });
  },

  create(data) {
    return prisma.properties.create({ data });
  },

  update(propertyId, data) {
    return prisma.properties.update({ where: { property_id: propertyId }, data });
  },

  delete(propertyId) {
    return prisma.properties.delete({ where: { property_id: propertyId } });
  },
};
