const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
require("dotenv").config();

// --- EMAIL TRANSPORTER USING GMAIL ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- SEND OTP FOR REGISTRATION ---
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Clear previous OTPs for the same email
    await Otp.deleteMany({ email });

    const otpDoc = new Otp({ email, otp: otpCode, expiresAt });
    await otpDoc.save();

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: email,
      subject: "Your CampusCab OTP",
      text: `Your OTP for CampusCab registration is: ${otpCode}. It is valid for 10 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to send OTP. Try again." });
  }
});

// --- VERIFY OTP & REGISTER USER ---
router.post("/verify-otp-register", async (req, res) => {
  try {
    const { name, phone, email, password, role, otp } = req.body;

    if (!name || !phone || !email || !password || !role || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "All fields and OTP are required" });
    }

    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired. Please request again." });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    // OTP valid → create user
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const user = new User({ name, phone, email, password, role });
    await user.save();

    // cleanup OTPs
    await Otp.deleteMany({ email });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res
      .status(500)
      .json({ success: false, message: "Registration failed. Try again." });
  }
});

// --- NORMAL LOGIN (NO OTP) ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login error" });
  }
});

module.exports = router;
