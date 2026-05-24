import { prisma } from "../config/prisma.js";

export const AdminRepository = {
  async findByEmail(email) {
    return prisma.admins.findUnique({ where: { email } });
  },

  async findById(adminId) {
    return prisma.admins.findUnique({ where: { admin_id: adminId } });
  },

  async updateLastLogin(adminId) {
    return prisma.admins.update({ where: { admin_id: adminId }, data: { last_login: new Date() } });
  },
};
