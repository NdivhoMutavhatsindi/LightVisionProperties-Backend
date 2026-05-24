import { prisma } from "../config/prisma.js";

export const OfferToPurchaseRepository = {
  create(data) {
    return prisma.offers_to_purchase.create({ data });
  },

  findAll() {
    return prisma.offers_to_purchase.findMany({ orderBy: { created_at: "desc" } });
  },
};
