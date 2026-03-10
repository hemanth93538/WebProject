import express from "express";
import Case from "../models/Case.js";

const router = express.Router();

// CREATE CASE
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      ageRange,
      village,
      symptoms,
      onsetDate,
      additionalNotes
    } = req.body;

    // basic validation
    if (!ageRange || !village || !symptoms || symptoms.length === 0 || !onsetDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCase = new Case({
      patientName,
      ageRange,
      village,
      symptoms,
      onsetDate,
      additionalNotes,
      status: "Reported"
    });

    await newCase.save();

    res.status(201).json({
      message: "Case reported successfully",
      case: newCase
    });
  } catch (error) {
    console.error("CASE CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
