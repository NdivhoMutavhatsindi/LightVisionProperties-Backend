import express from "express";
import { ClientRequestService } from "../service/ClientRequestService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const contact = await ClientRequestService.createContact(req.body);
    return res.status(201).json({ message: "Contact request submitted.", data: contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
