import express from "express";
import { BondApplicationService } from "../service/BondApplicationService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const application = await BondApplicationService.create(req.body);
    res.status(201).json({ message: "Bond application submitted.", data: application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
