import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { sequelize, User } from "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const email = process.env.ADMIN_EMAIL ?? "admin@lightvision.property";
const password = process.env.ADMIN_PASSWORD ?? "Admin@1234";
const name = process.env.ADMIN_NAME ?? "Light Vision Admin";

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  const existingUser = await User.findOne({ where: { email } });
  const passwordHash = await bcrypt.hash(password, 12);
  if (existingUser) {
    let updated = false;
    if (existingUser.role !== "admin") {
      existingUser.role = "admin";
      updated = true;
    }
    if (existingUser.passwordHash !== passwordHash) {
      existingUser.passwordHash = passwordHash;
      updated = true;
    }
    if (updated) {
      await existingUser.save();
      console.log(`Updated existing admin user: ${email}`);
    } else {
      console.log(`Admin user already exists and is up to date: ${email}`);
    }
    return;
  }

  const adminUser = await User.create({
    name,
    email,
    passwordHash,
    role: "admin",
    status: "active",
  });

  console.log(`Created admin user: ${adminUser.email}`);
  console.log(`Password: ${password}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed admin user:", error);
    process.exit(1);
  });
