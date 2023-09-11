const mongoose = require('mongoose');

async function connectMongoDB () {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/filesio", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.")
  } catch (err){
    console.error("Database connection error:", err);
  }
 
}

module.exports = {connectMongoDB};
