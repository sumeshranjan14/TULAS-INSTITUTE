const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const admissionRoutes = require('./routes/admissions');
const courseRoutes = require('./routes/courses');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/admissions', admissionRoutes);
app.use('/api/courses', courseRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Optional 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
