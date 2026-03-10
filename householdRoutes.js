import express from "express";
import Household from "../models/Household.js";

const router = express.Router();

/* ✅ CHW – Get assigned households */
router.get("/chw/:chwId", async (req, res) => {
  try {
    const households = await Household.find({
      chwId: req.params.chwId
    });
    res.json(households);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Health Admin – Get all households */
router.get("/", async (req, res) => {
  try {
    const households = await Household.find().populate("chwId", "name");
    res.json(households);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Assign household to CHW */
router.post("/", async (req, res) => {
  try {
    const household = await Household.create(req.body);
    res.json(household);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
