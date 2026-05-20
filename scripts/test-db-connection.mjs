import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function test() {
  try {
    await sequelize.authenticate();
    const [result] = await sequelize.query('SELECT version();');
    console.log('Postgres version:', result[0]);
    await sequelize.close();
  } catch (err) {
    console.error('DB test failed:', err);
    process.exit(1);
  }
}

test();
