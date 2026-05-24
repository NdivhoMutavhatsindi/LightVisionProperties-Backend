import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { AuthService } from "../../service/AuthService.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const admin = await AuthService.getMe(req.admin.adminId);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found." });
  }

  return res.json({ email: admin.email, adminId: admin.admin_id, createdAt: admin.created_at });
});

export default router;
