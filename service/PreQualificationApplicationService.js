import { PreQualificationApplicationRepository } from "../repository/PreQualificationApplicationRepository.js";

export const PreQualificationApplicationService = {
  getAll() {
    return PreQualificationApplicationRepository.findAll();
  },
  create(payload) {
    const data = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      id_number: payload.idNumber || "",
      email: payload.email,
      phone: payload.phone,
      employment_status: payload.employmentStatus || "",
      employer_name: payload.employerName || "",
      gross_monthly_income: payload.grossMonthlyIncome ? Number(payload.grossMonthlyIncome) : 0,
      monthly_expenses: payload.monthlyExpenses ? Number(payload.monthlyExpenses) : 0,
      property_type: payload.propertyType || "",
      price_range: payload.priceRange || "",
      deposit_available: payload.depositAvailable ? Number(payload.depositAvailable) : 0,
    };
    return PreQualificationApplicationRepository.create(data);
  },
};
