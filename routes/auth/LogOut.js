import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/logout", authMiddleware, (req, res) => {
  return res.status(204).send();
});

export default router;
