const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    const connection = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${connection.connection.host}`);

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;