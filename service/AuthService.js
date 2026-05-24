import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AdminRepository } from "../repository/AdminRepository.js";

export const AuthService = {
  async login(email, password) {
    const admin = await AdminRepository.findByEmail(email);
    if (!admin) {
      throw new Error("Invalid credentials.");
    }

    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword) {
      throw new Error("Invalid credentials.");
    }

    await AdminRepository.updateLastLogin(admin.admin_id);

    const token = jwt.sign({ adminId: admin.admin_id, email: admin.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    return {
      token,
      admin: { email: admin.email, adminId: admin.admin_id },
    };
  },

  async getMe(adminId) {
    return AdminRepository.findById(adminId);
  },
};
