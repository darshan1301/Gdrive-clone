const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = { connectMongoDB };
