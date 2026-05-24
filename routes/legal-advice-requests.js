import express from "express";
import { LegalAdviceRequestService } from "../service/LegalAdviceRequestService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request = await LegalAdviceRequestService.create(req.body);
    res.status(201).json({ message: "Legal advice request submitted.", data: request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
