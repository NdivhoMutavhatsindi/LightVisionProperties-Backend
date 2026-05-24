import express from "express";
import { sequelize } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      `SELECT u.id, u.full_name AS name, u.email, u.phone, u.profile_image AS profileImage, u.status,
              COALESCE(a.position, '') AS position, COALESCE(a.bio, '') AS bio,
              COALESCE(a.listings_count, 0) AS listingsCount, COALESCE(a.experience_years, 0) AS experienceYears
       FROM users u
       LEFT JOIN agents a ON u.id = a.user_id
       WHERE u.role = 'agent'
       ORDER BY u.full_name ASC`
    );

    const agents = Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          profileImage: row.profileImage,
          status: row.status,
          position: row.position,
          bio: row.bio,
          listingsCount: Number(row.listingsCount) || 0,
          experienceYears: Number(row.experienceYears) || 0,
        }))
      : [];

    res.json(agents);
  } catch (error) {
    console.error("Fetch agents error:", error);
    res.status(500).json({ message: "Unable to load agents" });
  }
});

export default router;
