const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const questRoutes = require("./routes/quests");
const reflectionRoutes = require("./routes/reflections");
const uploadRoutes = require("./routes/upload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/reflections", reflectionRoutes);
app.use("/api/upload", uploadRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection failed:", err));