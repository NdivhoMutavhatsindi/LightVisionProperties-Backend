import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";
import { ValuationRequest, sequelize } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const valuations = await ValuationRequest.findAll({
      order: [[sequelize.col("created_at"), "DESC"]],
      limit: 100,
    });

    res.json(valuations);
  } catch (error) {
    console.error("Fetch valuation requests error:", error);
    res.status(500).json({ message: "Unable to load valuation requests." });
  }
});

router.post(
  "/",
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("propertyAddress").trim().notEmpty().withMessage("Property address is required"),
    body("propertyType").trim().notEmpty().withMessage("Property type is required"),
    body("estimatedValue").optional().trim(),
    body("phone").optional().trim(),
    body("notes").optional().trim(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { fullName, email, phone, propertyAddress, propertyType, estimatedValue, notes } = req.body;
      const valuation = await ValuationRequest.create({
        fullName,
        email,
        phone,
        propertyAddress,
        propertyType,
        estimatedSize: estimatedValue,
        notes,
      });

      const io = req.app.get("io");
      if (io) {
        io.emit("valuationsUpdated");
      }

      res.status(201).json({ ok: true, valuation });
    } catch (error) {
      console.error("Create valuation request error:", error);
      res.status(500).json({ message: "Unable to submit valuation request." });
    }
  },
);

export default router;
