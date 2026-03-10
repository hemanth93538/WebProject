import express from "express";
import Case from "../models/Case.js";   // ⚠️ keep filename case correct
import Alert from "../models/Alert.js";
import User from "../models/User.js";

const router = express.Router();

/* ============================
   📊 DASHBOARD SUMMARY
   ============================ */
router.get("/summary", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalCases = await Case.countDocuments();
    const casesToday = await Case.countDocuments({
      createdAt: { $gte: today }
    });

    const totalAlerts = await Alert.countDocuments();
    const alertsToday = await Alert.countDocuments({
      createdAt: { $gte: today }
    });

    const chwUsers = await User.countDocuments({ role: "CHW" });

    res.json({
      totalCases,
      casesToday,
      totalAlerts,
      alertsToday,
      chwUsers
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Dashboard summary failed" });
  }
});

/* ============================
   🆕 LATEST REPORTED CASES
   ============================ */
router.get("/latest-cases", async (req, res) => {
  try {
    const cases = await Case.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(5);               // last 5 cases

    res.json(cases);
  } catch (err) {
    console.error("Latest cases error:", err);
    res.status(500).json({ error: "Failed to load latest cases" });
  }
});

export default router;
