import express from "express";
import Vital from "../models/Vital.js";

const router = express.Router();

/* ➕ ADD VITALS (CHW) */
router.post("/", async (req, res) => {
  try {
    const vital = await Vital.create(req.body);
    res.json({ message: "Vitals saved", vital });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 📥 GET VITALS (Health Dashboard) */
router.get("/", async (req, res) => {
  try {
    const vitals = await Vital.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
