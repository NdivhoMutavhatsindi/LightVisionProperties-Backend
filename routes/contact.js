import express from "express";
import nodemailer from "nodemailer";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("inquiry").trim().notEmpty().withMessage("Inquiry type is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validateRequest,
  async (req, res) => {
    const { name, email, inquiry, message, date } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ?? "smtp.mailtrap.io",
      port: Number(process.env.EMAIL_PORT ?? 2525),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM ?? "no-reply@lightvision.co.za",
      to: process.env.CONTACT_RECIPIENT ?? process.env.EMAIL_FROM ?? "no-reply@lightvision.co.za",
      subject: `New contact request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nInquiry: ${inquiry}\nDate: ${date ?? "n/a"}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Inquiry:</strong> ${inquiry}</p><p><strong>Date:</strong> ${date ?? "n/a"}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    res.json({ status: "sent" });
  },
);

export default router;
