import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const base = 'http://localhost:5000';

async function run(){
  console.log('GET /api/properties');
  console.log(await (await globalThis.fetch(base+'/api/properties')).text());

  console.log('\nGET /api/agents');
  console.log(await (await globalThis.fetch(base+'/api/agents')).text());

  console.log('\nGET /api/careers');
  console.log(await (await globalThis.fetch(base+'/api/careers')).text());

  // create career via prisma
  const career = await prisma.careers.create({ data: { title: 'Smoke Test Role', location: 'Remote', employment_type: 'Contract', description: 'For smoke tests' } });
  console.log('\nCreated career id:', career.career_id);

  console.log('\nPOST /api/contact');
  let res = await globalThis.fetch(base+'/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ fullName: 'Smoke Contact', email: 'contact@smoke.test', phone: '555-0100', message: 'Hello from smoke tests' }) });
  console.log('status', res.status);
  console.log(await res.text());

  console.log('\nPOST /api/job-applications');
  res = await globalThis.fetch(base+'/api/job-applications', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ careerId: career.career_id, fullName: 'Applicant Smoke', email: 'applicant@smoke.test', phone: '555-0101' }) });
  console.log('status', res.status);
  console.log(await res.text());

  console.log('\nPOST /api/valuations');
  res = await globalThis.fetch(base+'/api/valuations', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ fullName: 'Valuation Tester', email: 'val@smoke.test', phone: '555-0102', propertyAddress: '123 Test Ave' }) });
  console.log('status', res.status);
  console.log(await res.text());

  await prisma.$disconnect();
}

run().catch(e=>{ console.error(e); process.exit(1); });
