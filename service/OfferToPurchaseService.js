import { OfferToPurchaseRepository } from "../repository/OfferToPurchaseRepository.js";

const splitName = (fullName, firstName, lastName) => {
  if (firstName || lastName) {
    return { first_name: firstName || "", last_name: lastName || "" };
  }

  const parts = (fullName || "").trim().split(" ");
  return {
    first_name: parts.shift() || "",
    last_name: parts.join(" ") || "",
  };
};

export const OfferToPurchaseService = {
  getAll() {
    return OfferToPurchaseRepository.findAll();
  },
  create(payload) {
    const names = splitName(payload.fullName, payload.firstName, payload.lastName);
    return OfferToPurchaseRepository.create({
      property_id: payload.propertyId,
      ...names,
      email: payload.email,
      phone: payload.phone,
      offer_document_url: payload.offerDocumentUrl || "",
      offer_amount: payload.offerAmount ? Number(payload.offerAmount) : undefined,
    });
  },
};
