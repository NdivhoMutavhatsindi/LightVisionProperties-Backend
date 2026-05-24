import express from "express";
import { PropertyService } from "../service/PropertyService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const properties = await PropertyService.getAll(req.query);
  res.json(properties);
});

router.get("/:id", async (req, res) => {
  const property = await PropertyService.getById(req.params.id);
  if (!property) {
    return res.status(404).json({ message: "Property not found." });
  }
  res.json(property);
});

export default router;
