import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Existing Routes
import caseRoutes from "./routes/caseRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";
import householdRoutes from "./routes/householdRoutes.js";


// New AI & Geo Routes
import geoRoutes from "./routes/geoRoutes.js";
import waterQualityRoutes from "./routes/waterQualityRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/cases", caseRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/vitals", vitalRoutes);
app.use("/api/households", householdRoutes);


app.use("/api/geo", geoRoutes);
app.use("/api/quality", waterQualityRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/water", waterQualityRoutes);
app.get("/api/reports/daily", (req, res) => {
  res.json({ message: "Daily health report generated successfully" });
});


// ⭐ Home route → main dashboard HTML
app.get("/", (req, res) => {
  res.sendFile("pages/main_dashboard.html", { root: "public" });
});

// Serve static files (CSS, other pages)
app.use(express.static("public"));

// ⭐ FIX PORT HERE
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Export routes loaded");
  console.log(`🚀 Backend running on port ${PORT}`);
});
