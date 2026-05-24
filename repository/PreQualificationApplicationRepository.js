import { prisma } from "../config/prisma.js";

export const PreQualificationApplicationRepository = {
  create(data) {
    return prisma.prequalification_applications.create({ data });
  },

  findAll() {
    return prisma.prequalification_applications.findMany({ orderBy: { created_at: "desc" } });
  },
};
