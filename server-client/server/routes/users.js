const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 👤 GET current user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// 🎭 PATCH mood & traits
router.patch("/profile", authMiddleware, async (req, res) => {
  const { mood, traits } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { mood, traits },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to update profile" });
  }
});

// 💰 Add Spark Points
router.patch("/points/add", authMiddleware, async (req, res) => {
  const { points } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.points += points;
    await user.save();
    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ error: "Could not add points" });
  }
});

// 🎁 Redeem Points for Rewards
router.patch("/points/redeem", authMiddleware, async (req, res) => {
  const { cost } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.points < cost) {
      return res.status(400).json({ error: "Not enough points" });
    }
    user.points -= cost;
    await user.save();
    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ error: "Could not redeem reward" });
  }
});

module.exports = router;
