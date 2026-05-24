import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Agent } from "./Agent.js";
import { Property } from "./Property.js";
import { ValuationRequest } from "./ValuationRequest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

export { sequelize, User, Agent, Property, ValuationRequest };
