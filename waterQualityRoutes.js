// backend/routes/waterQualityRoutes.js
import express from "express";

const router = express.Router();

// Simple rule-based "AI" prediction
router.get("/predict", (req, res) => {
  const ph = parseFloat(req.query.ph);
  const turbidity = parseFloat(req.query.turbidity);
  const temperature = parseFloat(req.query.temperature);

  if (isNaN(ph) || isNaN(turbidity) || isNaN(temperature)) {
    return res.status(400).json({ status: "Error", message: "Invalid or missing inputs" });
  }

  let status = "Good";
  let message = "Water quality is within safe limits.";

  // very simple demo logic – tweak as you like
  if (ph < 6.5 || ph > 8.5 || turbidity > 5 || temperature > 35) {
    status = "Poor";
    message = "Water quality is outside recommended safe range.";
  } else if (turbidity > 2 || temperature > 30) {
    status = "Moderate";
    message = "Water is acceptable but not ideal.";
  }

  return res.json({ status, message, ph, turbidity, temperature });
});

export default router;
