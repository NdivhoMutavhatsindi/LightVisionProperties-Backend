import { prisma } from "../config/prisma.js";

export const ComplianceRequestRepository = {
  create(data) {
    return prisma.compliance_requests.create({ data });
  },

  findAll() {
    return prisma.compliance_requests.findMany({ orderBy: { created_at: "desc" } });
  },
};
