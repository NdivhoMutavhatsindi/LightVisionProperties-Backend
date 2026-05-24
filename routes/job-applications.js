import express from "express";
import { JobApplicationService } from "../service/JobApplicationService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const application = await JobApplicationService.create(req.body);
    res.status(201).json({ message: "Job application submitted.", data: application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
