import { ValuationRequestRepository } from "../repository/ValuationRequestRepository.js";

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

export const ValuationRequestService = {
  getAll() {
    return ValuationRequestRepository.findAll();
  },
  create(payload) {
    const names = splitName(payload.fullName, payload.firstName, payload.lastName);
    return ValuationRequestRepository.create({
      ...names,
      email: payload.email,
      phone: payload.phone,
      message: payload.message || "",
    });
  },
};
