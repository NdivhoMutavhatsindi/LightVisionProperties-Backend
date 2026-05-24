import express from "express";
import path from "path";
import { sequelize, User } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dialect = sequelize.getDialect();
    let database = null;
    let tables = [];

    if (dialect === "sqlite") {
      database = path.basename(sequelize.options.storage || "sqlite");
      const [tablesResult] = await sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
      );
      tables = Array.isArray(tablesResult) ? tablesResult.map((row) => row.name).filter(Boolean) : [];
    } else if (dialect === "postgres" || dialect === "postgresql") {
      const [databaseResult] = await sequelize.query("SELECT current_database() AS dbName");
      database = Array.isArray(databaseResult) && databaseResult[0] ? databaseResult[0].dbName : null;
      const [tablesResult] = await sequelize.query(
        "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename"
      );
      tables = Array.isArray(tablesResult)
        ? tablesResult.map((row) => row.tablename).filter(Boolean)
        : [];
    } else {
      const [databaseResult] = await sequelize.query("SELECT DATABASE() AS dbName");
      database = Array.isArray(databaseResult) && databaseResult[0] ? databaseResult[0].dbName : null;
      const [tablesResult] = await sequelize.query("SHOW TABLES");
      tables = Array.isArray(tablesResult)
        ? tablesResult.map((row) => Object.values(row)[0]).filter(Boolean)
        : [];
    }

    const userCountsRaw = await User.findAll({
      attributes: ["role", [sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      group: ["role"],
    });

    const userCounts = userCountsRaw.map((row) => ({
      role: row.role,
      count: Number(row.get("count")) || 0,
    }));

    res.json({ database, userCounts, tables });
  } catch (error) {
    console.error("Dashboard route error:", error);
    res.status(500).json({ message: "Unable to load dashboard data." });
  }
});

export default router;
