import { ClientRequestRepository } from "../repository/ClientRequestRepository.js";
import crypto from "crypto";

export const ClientRequestService = {
  createContact(payload) {
    const data = {
      request_type: "contact",
      reference_id: crypto.randomUUID(),
      client_email: payload.email,
      status: "pending",
    };
    return ClientRequestRepository.create(data);
  },
  findAll() {
    return ClientRequestRepository.findAll();
  },
};
