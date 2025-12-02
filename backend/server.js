const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const rideRoutes = require("./routes/rides");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// --- MONGO CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("CampusCab API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
