const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    duration: String,
    fees: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
