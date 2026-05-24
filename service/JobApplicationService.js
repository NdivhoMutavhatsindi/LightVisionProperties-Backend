import { JobApplicationRepository } from "../repository/JobApplicationRepository.js";

export const JobApplicationService = {
  getAll() {
    return JobApplicationRepository.findAll();
  },
  create(payload) {
    const splitName = (fullName, firstName, lastName) => {
      if (firstName || lastName) return { first_name: firstName || "", last_name: lastName || "" };
      const parts = (fullName || "").trim().split(/\s+/);
      return { first_name: parts.shift() || "", last_name: parts.join(" ") || "" };
    };

    const names = splitName(payload.fullName, payload.firstName, payload.lastName);

    const data = {
      career_id: payload.careerId,
      ...names,
      email: payload.email,
      phone: payload.phone,
      cv_url: payload.cvUrl || payload.resumeUrl || "",
      cover_letter: payload.coverLetter || payload.message || "",
    };
    return JobApplicationRepository.create(data);
  },
};
