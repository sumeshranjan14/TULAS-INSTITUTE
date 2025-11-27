const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/admissionDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`📡 MongoDB connected`);
    console.log(`🟢 Host: ${conn.connection.host}`);
    console.log(`🔌 Port: ${conn.connection.port}`);
    console.log(`📁 DB:   ${conn.connection.name}`);

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
