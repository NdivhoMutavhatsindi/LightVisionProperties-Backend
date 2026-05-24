import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { sequelize, User, Admin } from "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const email = process.env.ADMIN_EMAIL ?? "admin@lightvision.property";
const password = process.env.ADMIN_PASSWORD ?? "Admin@1234";
const name = process.env.ADMIN_NAME ?? "Light Vision Admin";

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  const passwordHash = await bcrypt.hash(password, 12);

  const [adminRecord, createdAdmin] = await Admin.findOrCreate({
    where: { email },
    defaults: {
      email,
      passwordHash,
      lastLogin: null,
    },
  });

  if (!createdAdmin) {
    let updated = false;
    if (adminRecord.passwordHash !== passwordHash) {
      adminRecord.passwordHash = passwordHash;
      updated = true;
    }
    if (updated) {
      await adminRecord.save();
      console.log(`Updated existing admin record: ${email}`);
    } else {
      console.log(`Admin record already exists and is up to date: ${email}`);
    }
  } else {
    console.log(`Created admin record: ${adminRecord.email}`);
  }

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
      status: "active",
    });
    console.log(`Created admin user in users table: ${email}`);
  } else {
    let updatedUser = false;
    if (existingUser.role !== "admin") {
      existingUser.role = "admin";
      updatedUser = true;
    }
    if (existingUser.passwordHash !== passwordHash) {
      existingUser.passwordHash = passwordHash;
      updatedUser = true;
    }
    if (updatedUser) {
      await existingUser.save();
      console.log(`Updated existing admin user in users table: ${email}`);
    } else {
      console.log(`Admin user already exists and is up to date in users table: ${email}`);
    }
  }

  console.log(`Password: ${password}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed admin user:", error);
    process.exit(1);
  });
