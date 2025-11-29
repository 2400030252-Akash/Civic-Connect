// backend/server.js
// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/civic_connect";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// 4) USER SCHEMA & MODEL  (this MUST come AFTER mongoose import)
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }, // plain text for learning only
    role: { type: String, default: "citizen" },
    district: { type: String },
    action: {
      type: String,
      enum: ["login", "register"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// 5) ROUTES

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Route to save login / register event
app.post("/api/login", async (req, res) => {
  try {
    const { name, email, password, role, district, action } = req.body;

    console.log("📥 New auth event:", req.body);

    if (!email || !password || !action) {
      return res
        .status(400)
        .json({ message: "email, password and action are required" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      district,
      action,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Login/registration saved to database" });
  } catch (error) {
    console.error("Error in /api/login:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
