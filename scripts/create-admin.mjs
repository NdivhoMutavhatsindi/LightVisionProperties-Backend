import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

async function main(){
  const email = process.env.ADMIN_EMAIL || 'admin@local.test';
  const password = process.env.ADMIN_PASSWORD || 'Passw0rd!';
  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.admins.findFirst({ where: { email } });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const admin = await prisma.admins.create({ data: { email, password_hash: hashed } });
  console.log("Created admin:", admin.email);
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
