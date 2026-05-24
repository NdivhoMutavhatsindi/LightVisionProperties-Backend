import { sequelize } from "./config/database.js";
(async () => {
  try {
    const [rows] = await sequelize.query("SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name='careers' ORDER BY ordinal_position");
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
