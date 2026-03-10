// backend/routes/sensorRoutes.js
import express from "express";
import SensorData from "../models/SensorData.js";

const router = express.Router();

// Return latest sensor data (or a demo fallback)
router.get("/latest", async (req, res) => {
  try {
    let latest = await SensorData.findOne().sort({ createdAt: -1 });

    if (!latest) {
      // fallback if DB is empty
      latest = {
        ph: 7.2,
        turbidity: 1.5,
        temperature: 27,
        createdAt: new Date(),
      };
    }

    res.json({
      ph: latest.ph,
      turbidity: latest.turbidity,
      temperature: latest.temperature,
      timestamp: latest.createdAt,
    });
  } catch (err) {
    console.error("Error loading latest sensor data:", err);
    res.status(500).json({ message: "Failed to load sensor data" });
  }
});

export default router;
