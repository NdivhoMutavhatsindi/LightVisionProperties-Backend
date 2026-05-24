import express from "express";
import { ComplianceRequestService } from "../service/ComplianceRequestService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request = await ComplianceRequestService.create(req.body);
    res.status(201).json({ message: "Compliance request submitted.", data: request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
