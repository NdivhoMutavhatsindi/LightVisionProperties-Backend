import { prisma } from "../config/prisma.js";

export const JobApplicationRepository = {
  findAll() {
    return prisma.job_applications.findMany({ orderBy: { created_at: "desc" } });
  },

  create(data) {
    const { career_id, ...rest } = data;
    const createData = career_id ? { ...rest, careers: { connect: { career_id } } } : rest;
    return prisma.job_applications.create({ data: createData });
  },
};
