const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Check if MONGO_URI is set, if not use a default local connection
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI);
    console.log("✅ Auth Service MongoDB Connected...");
  } catch (error) {
    console.error("❌ Auth Service MongoDB Connection Failed:", error.message);
    console.log(
      "⚠️  Continuing without MongoDB connection (for development/testing)"
    );
    // Don't exit the process, allow the service to continue running
  }
};

module.exports = connectDB;
