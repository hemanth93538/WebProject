// backend/routes/geoRoutes.js
import express from "express";
import haversine from "haversine-distance";

const router = express.Router();

// Example lakes – use real coordinates if you want
const lakes = [
  { name: "Lake A", lat: 15.3000, lon: 75.1000 },
  { name: "Lake B", lat: 15.3500, lon: 75.0500 },
  { name: "Lake C", lat: 15.2500, lon: 75.1200 },
];

router.get("/nearby", (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ message: "lat and lon query params are required" });
  }

  const userPoint = { lat, lon };

  let best = null;

  lakes.forEach((lake) => {
    const lakePoint = { lat: lake.lat, lon: lake.lon };
    const dist = haversine(userPoint, lakePoint); // in meters

    if (!best || dist < best.distance_meters) {
      best = {
        name: lake.name,
        distance_meters: dist,
      };
    }
  });

  if (!best) {
    return res.status(404).json({ message: "No lakes configured" });
  }

  res.json(best);
});

export default router;
