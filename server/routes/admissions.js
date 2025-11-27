const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const Course = require('../models/Course');

// POST /api/admissions (Create Admission)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, course, twelfthPercentage } = req.body;

    if (!name || !email || !course) {
      return res
        .status(400)
        .json({ error: 'name, email and course are required' });
    }

    // Validate course exists
    const foundCourse = await Course.findById(course);
    if (!foundCourse) {
      return res.status(400).json({ error: 'Invalid course id' });
    }

    // Create admission
    const admission = await Admission.create({
      name,
      email,
      phone,
      course,
      twelfthPercentage
    });

    // Populate course
    await admission.populate('course');

    res.status(201).json(admission);
  } catch (err) {
    console.error('POST /api/admissions ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admissions (List)
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate('course')
      .sort({ createdAt: -1 });

    res.json(admissions);
  } catch (err) {
    console.error('GET /api/admissions ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admissions/:id (Single Admission)
router.get('/:id', async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).populate('course');

    if (!admission) {
      return res.status(404).json({ error: 'Admission not found' });
    }

    res.json(admission);
  } catch (err) {
    console.error('GET /api/admissions/:id ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
