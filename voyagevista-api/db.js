const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Failed', error);
    process.exit(1);
  }
}

module.exports = connectDB;