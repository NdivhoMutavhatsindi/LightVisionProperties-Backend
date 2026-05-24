import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Admin } from "./Admin.js";
import { Agent } from "./Agent.js";
import { Property } from "./Property.js";
import { ContactMessage } from "./ContactMessage.js";
import { Career } from "./Career.js";
import { JobApplication } from "./JobApplication.js";
import { ValuationRequest } from "./ValuationRequest.js";
import { BondApplication } from "./BondApplication.js";
import { PrequalificationApplication } from "./PrequalificationApplication.js";
import { ComplianceRequest } from "./ComplianceRequest.js";
import { OfferToPurchase } from "./OfferToPurchase.js";
import { LegalAdviceRequest } from "./LegalAdviceRequest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

Career.hasMany(JobApplication, { foreignKey: "careerId" });
JobApplication.belongsTo(Career, { foreignKey: "careerId" });

export {
  sequelize,
  User,
  Admin,
  Agent,
  Property,
  ContactMessage,
  Career,
  JobApplication,
  ValuationRequest,
  BondApplication,
  PrequalificationApplication,
  ComplianceRequest,
  OfferToPurchase,
  LegalAdviceRequest,
};
