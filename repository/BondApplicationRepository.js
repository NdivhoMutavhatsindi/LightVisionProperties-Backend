import { prisma } from "../config/prisma.js";

export const BondApplicationRepository = {
  create(data) {
    return prisma.bond_applications.create({ data });
  },

  findAll() {
    return prisma.bond_applications.findMany({ orderBy: { created_at: "desc" } });
  },
};
