import { sequelize } from '../config/database.js';

async function main() {
  try {
    await sequelize.authenticate();
    const [tables] = await sequelize.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename");
    console.log('tables:', tables.map((r) => r.tablename));
    const [db] = await sequelize.query('SELECT current_database() AS db');
    console.log('database:', db[0].db);
  } catch (err) {
    console.error('error:', err);
  } finally {
    await sequelize.close();
  }
}

main();
