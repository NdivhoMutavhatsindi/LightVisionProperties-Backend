import { LegalAdviceRequestRepository } from "../repository/LegalAdviceRequestRepository.js";

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

export const LegalAdviceRequestService = {
  getAll() {
    return LegalAdviceRequestRepository.findAll();
  },
  create(payload) {
    const names = splitName(payload.fullName, payload.firstName, payload.lastName);
    return LegalAdviceRequestRepository.create({
      ...names,
      email: payload.email,
      phone: payload.phone,
      message: payload.message || "",
    });
  },
};
