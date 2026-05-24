import express from "express";
import { OfferToPurchaseService } from "../service/OfferToPurchaseService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const offer = await OfferToPurchaseService.create(req.body);
    res.status(201).json({ message: "Offer submitted.", data: offer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
