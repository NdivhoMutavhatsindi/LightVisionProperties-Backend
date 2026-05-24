import express from "express";
import { sequelize } from "../models/index.js";

const router = express.Router();

const properties = [
  { id: 1, title: "Oceanfront Retreat", location: "Camps Bay", price: "R 24,500,000", beds: 5, baths: 4, area: "640 m²", type: "Sale" },
  { id: 2, title: "Skyline Penthouse", location: "Sandton Central", price: "R 18,900,000", beds: 3, baths: 3, area: "320 m²", type: "Sale" },
  { id: 3, title: "Linden Residence", location: "Bryanston", price: "R 42,000 / mo", beds: 4, baths: 3, area: "410 m²", type: "Rent" },
  { id: 4, title: "Maison Verte", location: "Constantia", price: "R 11,750,000", beds: 4, baths: 3, area: "380 m²", type: "Sale" },
];

const isValidImageValue = (value) => {
  return (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://") || /^data:image\/(png|jpe?g|webp);base64,[A-Za-z0-9+/=]+$/.test(value))
  );
};

router.get("/", async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      `SELECT id, agent_id, neighborhood_id, property_type_id, title, description, purpose, price, bedrooms, bathrooms, garages, kitchens, lounges, property_size, land_size, address, city, province, postal_code, latitude, longitude, featured, status, main_image, created_at
       FROM properties
       ORDER BY price DESC`
    );

    const safeRows = (Array.isArray(rows) ? rows : []).map((row) => {
      if (row.main_image && !isValidImageValue(row.main_image)) {
        return { ...row, main_image: null };
      }
      return row;
    });

    res.json(safeRows);
  } catch (err) {
    console.error("Fetch properties error:", err);
    res.status(500).json({ message: "Unable to load properties" });
  }
});

// Create property and persist to database (minimal fields)
router.post("/", async (req, res) => {
  try {
    const {
      agent_id = null,
      neighborhood_id = null,
      property_type_id = null,
      title = null,
      location = null,
      description = null,
      purpose = 'sale',
      price = null,
      bedrooms = null,
      bathrooms = null,
      main_image = null,
      status = 'available',
    } = req.body;

    if (!title || !main_image) {
      return res.status(400).json({ message: 'Title and main_image are required' });
    }

    const nowFunction = sequelize.getDialect() === "sqlite" ? "CURRENT_TIMESTAMP" : "NOW()";
    const sql = `INSERT INTO properties (agent_id, neighborhood_id, property_type_id, title, description, purpose, price, bedrooms, bathrooms, main_image, status, address, created_at)
      VALUES (:agent_id, :neighborhood_id, :property_type_id, :title, :description, :purpose, :price, :bedrooms, :bathrooms, :main_image, :status, :location, ${nowFunction})`;

    const [result] = await sequelize.query(sql, {
      replacements: { agent_id, neighborhood_id, property_type_id, title, description, purpose, price, bedrooms, bathrooms, main_image, status, location },
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("propertiesUpdated");
    }

    res.status(201).json({ ok: true, inserted: result });
  } catch (err) {
    console.error('Create property error:', err);
    res.status(500).json({ message: 'Unable to create property' });
  }
});

export default router;
