import { prisma } from "../config/prisma.js";

export const ClientRequestRepository = {
  create(data) {
    return prisma.client_requests.create({ data });
  },

  findAll() {
    return prisma.client_requests.findMany({ orderBy: { created_at: "desc" } });
  },
};
