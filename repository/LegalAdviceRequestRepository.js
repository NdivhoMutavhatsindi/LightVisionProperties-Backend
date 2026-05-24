import { prisma } from "../config/prisma.js";

export const LegalAdviceRequestRepository = {
  create(data) {
    return prisma.legal_advice_requests.create({ data });
  },

  findAll() {
    return prisma.legal_advice_requests.findMany({ orderBy: { created_at: "desc" } });
  },
};
