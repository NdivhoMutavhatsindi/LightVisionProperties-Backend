import express from "express";
import { CareerService } from "../service/CareerService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const careers = await CareerService.getAll();
  res.json(careers);
});

router.get("/:id", async (req, res) => {
  const career = await CareerService.getById(req.params.id);
  if (!career) {
    return res.status(404).json({ message: "Career not found." });
  }
  res.json(career);
});

export default router;
