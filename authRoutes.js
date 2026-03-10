import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =====================
   SIGNUP
   ===================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,       // ⚠️ plain password (OK for project)
      role: role || "user"
    });

    res.json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================
   LOGIN
   ===================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// LOGOUT
router.post("/logout", (req, res) => {
  // frontend handles token/localStorage cleanup
  res.json({ message: "Logged out successfully" });
});

export default router;
