import express from "express";
import Case from "../models/Case.js";

const router = express.Router();

/**
 * EXPORT CASES AS CSV
 * URL: /api/export/cases
 */
router.get("/cases", async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });

    let csv = "Patient,Age,Village,Symptoms,Date\n";

    cases.forEach(c => {
      csv += `"${c.patientName || "Anonymous"}",`;
      csv += `"${c.ageRange}",`;
      csv += `"${c.village}",`;
      csv += `"${c.symptoms.join("|")}",`;
      csv += `"${c.createdAt.toISOString()}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=chw_cases_report.csv"
    );

    res.send(csv);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: "Failed to export cases" });
  }
});

export default router;
