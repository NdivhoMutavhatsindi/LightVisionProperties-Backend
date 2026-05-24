import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

async function main(){
  const career = await prisma.careers.create({ data: { title: 'Test Agent', location: 'Remote', employment_type: 'Full-time', description: 'Created for smoke tests' } });
  console.log(career.career_id);
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
