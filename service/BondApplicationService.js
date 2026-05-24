import { BondApplicationRepository } from "../repository/BondApplicationRepository.js";

export const BondApplicationService = {
  getAll() {
    return BondApplicationRepository.findAll();
  },
  create(payload) {
    return BondApplicationRepository.create({
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      id_number: payload.idNumber || "",
      marital_status: payload.maritalStatus || "",
      employment_status: payload.employmentStatus || "",
      employer_name: payload.employerName || "",
      base_salary: payload.baseSalary ?? 0,
      allowances: payload.allowances ?? 0,
      other_income: payload.otherIncome ?? 0,
      gross_income: payload.grossIncome ?? 0,
      monthly_expenses: payload.monthlyExpenses ?? 0,
      available_for_bond: payload.availableForBond ?? 0,
      debt_to_income_ratio: payload.debtToIncomeRatio ?? 0,
      disposable_income: payload.disposableIncome ?? 0,
    });
  },
};
