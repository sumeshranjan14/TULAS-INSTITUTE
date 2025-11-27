const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: String,
    
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },

    twelfthPercentage: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', AdmissionSchema);
