import { sequelize } from "./config/database.js";
(async () => {
  try {
    const [rows] = await sequelize.query("SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name IN ('properties','agents') ORDER BY table_name, ordinal_position");
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
