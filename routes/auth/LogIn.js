import express from "express";
import { AuthService } from "../../service/AuthService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await AuthService.login(email, password);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default router;
