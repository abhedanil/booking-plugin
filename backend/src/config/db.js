const mongoose = require("mongoose");
const MongoDB_URL = process.env.MONGO_URI;

async function connectDB() {
  if (!MongoDB_URL) {
    console.error("MongoDB URI is missing from environment variables");
    throw new Error("No MONGODB URI");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MongoDB_URL);
    console.log("✅ MongoDB connected!");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
    throw e;
  }
}

module.exports = connectDB;
