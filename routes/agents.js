import express from "express";
import { AgentService } from "../service/AgentService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const agents = await AgentService.getAll();
  res.json(agents);
});

router.get("/:id", async (req, res) => {
  const agent = await AgentService.getById(req.params.id);
  if (!agent) {
    return res.status(404).json({ message: "Agent not found." });
  }
  res.json(agent);
});

export default router;
