import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

export default router;
