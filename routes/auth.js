import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { sequelize, User } from "../models/index.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    body("phone").optional().isString().withMessage("Phone must be a string"),
    body("role").optional().isIn(["admin", "agent", "client", "legal_advisor"]).withMessage("Invalid role"),
    body("profileImage").optional().isString().withMessage("profileImage must be a string URL"),
    body("bio").optional().isString().withMessage("bio must be a string"),
    body("position").optional().isString().withMessage("position must be a string"),
    body("facebook_link").optional().isString().withMessage("facebook_link must be a string"),
    body("instagram_link").optional().isString().withMessage("instagram_link must be a string"),
    body("linkedin_link").optional().isString().withMessage("linkedin_link must be a string"),
    body("listings_count").optional().isInt({ min: 0 }).withMessage("listings_count must be a non-negative integer"),
    body("experience_years").optional().isInt({ min: 0 }).withMessage("experience_years must be a non-negative integer"),
  ],
  validateRequest,
  async (req, res) => {
    const { name, email, password, phone, role, profileImage, bio, position, facebook_link, instagram_link, linkedin_link, listings_count, experience_years } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userPayload = { name, email, passwordHash, phone };
    if (role) userPayload.role = role;
    if (profileImage) userPayload.profileImage = profileImage;
    const user = await User.create(userPayload);

    if (role === "agent") {
      await sequelize.query(
        `INSERT INTO agents (user_id, bio, position, facebook_link, instagram_link, linkedin_link, listings_count, experience_years)
         VALUES (:user_id, :bio, :position, :facebook_link, :instagram_link, :linkedin_link, :listings_count, :experience_years)`,
        {
          replacements: {
            user_id: user.id,
            bio: bio ?? null,
            position: position ?? null,
            facebook_link: facebook_link ?? null,
            instagram_link: instagram_link ?? null,
            linkedin_link: linkedin_link ?? null,
            listings_count: listings_count ?? 0,
            experience_years: experience_years ?? 0,
          },
        },
      );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "secret", { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  },
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
    body("role").isIn(["admin", "agent", "client"]).withMessage("Role must be admin, agent, or client"),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Access denied for this role" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET ?? "secret", { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  },
);

export default router;

router.get('/me', async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers['authorization']?.toString()?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'secret');
    // payload should contain id, email, role
    return res.json({ user: payload });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});
