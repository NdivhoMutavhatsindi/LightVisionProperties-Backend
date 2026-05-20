import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
const dialect = (process.env.DB_DIALECT ?? "mysql").toLowerCase();
const define = { underscored: true, freezeTableName: false };

const storagePath = process.env.DB_STORAGE
  ? path.isAbsolute(process.env.DB_STORAGE)
    ? process.env.DB_STORAGE
    : path.resolve(__dirname, "..", process.env.DB_STORAGE)
  : path.join(__dirname, "../db/lightvision.sqlite");

function getDialectOptions(d) {
  if (d === "postgres" || d === "postgresql") {
    return { ssl: { require: true, rejectUnauthorized: false } };
  }
  return undefined;
}

console.log('DB config debug: DATABASE_URL=', process.env.DATABASE_URL);
console.log('DB config debug: DB_HOST=', process.env.DB_HOST);
console.log('DB config debug: DB_DIALECT=', process.env.DB_DIALECT);

let sequelizeInstance;
if (dialect === "sqlite") {
  sequelizeInstance = new Sequelize({
    dialect: "sqlite",
    storage: storagePath,
    logging: false,
    define,
  });
} else if (process.env.DATABASE_URL) {
  // If a full connection URL is provided prefer it (useful for cloud providers)
  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: dialect === "postgresql" ? "postgres" : dialect,
    logging: false,
    define,
    dialectOptions: getDialectOptions(dialect),
  });
} else {
  // Fallback to individual env vars
  sequelizeInstance = new Sequelize(
    process.env.DB_DATABASE ?? "lightvision_db",
    process.env.DB_USER ?? "root",
    process.env.DB_PASSWORD ?? "",
    {
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT ?? (dialect === "mysql" ? 3306 : 5432)),
      dialect: dialect === "postgresql" ? "postgres" : dialect,
      logging: false,
      define,
      dialectOptions: getDialectOptions(dialect),
    },
  );
}

export const sequelize = sequelizeInstance;
