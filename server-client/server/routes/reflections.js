const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// Define Reflection model inline for simplicity
const ReflectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questTitle: String,
  type: String, // "text", "photo", or "audio"
  content: String, // URL or text
  createdAt: { type: Date, default: Date.now },
});

const Reflection = mongoose.model("Reflection", ReflectionSchema);

router.post("/", authMiddleware, async (req, res) => {
  const { questTitle, type, content } = req.body;
  try {
    const reflection = await Reflection.create({
      userId: req.user.id,
      questTitle,
      type,
      content,
    });
    res.status(201).json(reflection);
  } catch (err) {
    res.status(400).json({ error: "Failed to submit reflection" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reflections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reflections" });
  }
});

module.exports = router;