const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env.MONGO_URI);

/**
 * Database Connection
 * MongoDB Atlas – Production Safe
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast if Atlas is slow
      socketTimeoutMS: 45000,         // allow long queries
    });

    console.log(`🕉️  MongoDB Connected: ${conn.connection.host}`);
    console.log(`📍 Database: ${conn.connection.name}`);
    console.log(`✨ BrajPath Backend Ready - Jai Shri Krishna! 🙏\n`);
  } catch (error) {
    console.error("❌ MongoDB Initial Connection Failed:", error.message);
    // ❌ DO NOT exit the process
  }
};

/**
 * Connection event listeners (VERY IMPORTANT)
 */
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Waiting for reconnection...");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err.message);
});

module.exports = connectDB;
