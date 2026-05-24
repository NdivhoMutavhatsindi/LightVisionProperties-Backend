import express from "express";
import { ValuationRequestService } from "../service/ValuationRequestService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const valuation = await ValuationRequestService.create(req.body);
    res.status(201).json({ message: "Valuation request submitted.", data: valuation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
