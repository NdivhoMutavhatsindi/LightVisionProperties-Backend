import express from "express";
import { PreQualificationApplicationService } from "../service/PreQualificationApplicationService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const application = await PreQualificationApplicationService.create(req.body);
    res.status(201).json({ message: "Prequalification application submitted.", data: application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
