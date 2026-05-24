import express from "express";
import loginRoutes from "./auth/LogIn.js";
import logoutRoutes from "./auth/LogOut.js";
import meRoutes from "./auth/Me.js";

const router = express.Router();

router.use(loginRoutes);
router.use(logoutRoutes);
router.use(meRoutes);

export default router;
