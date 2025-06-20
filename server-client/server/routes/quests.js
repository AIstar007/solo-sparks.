const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Static sample quests (you can later store in DB or train a model)
const QUESTS = [
  {
    title: "Watch a sunset and reflect",
    mood: "stressed",
    traits: ["introvert", "reflective"],
    frequency: "daily",
  },
  {
    title: "Go for a solo coffee and journal",
    mood: "anxious",
    traits: ["thoughtful"],
    frequency: "weekly",
  },
  {
    title: "Dance to your favorite song",
    mood: "sad",
    traits: ["creative", "extrovert"],
    frequency: "daily",
  },
];

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Simple match logic based on mood/traits
    const personalized = QUESTS.filter((q) => {
      return (
        q.mood === user.mood ||
        q.traits.some((trait) => user.traits.includes(trait))
      );
    });

    res.json({ quests: personalized });
  } catch (err) {
    res.status(500).json({ error: "Failed to get personalized quests" });
  }
});

module.exports = router;