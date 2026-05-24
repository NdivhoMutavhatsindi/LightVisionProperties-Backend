import { prisma } from "../config/prisma.js";

export const ValuationRequestRepository = {
  create(data) {
    return prisma.valuation_requests.create({ data });
  },

  findAll() {
    return prisma.valuation_requests.findMany({ orderBy: { created_at: "desc" } });
  },
};
