const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// POST /api/courses  (Create Course)
router.post('/', async (req, res) => {
  try {
    const { name, duration, fees } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Course name is required" });
    }

    const course = await Course.create({
      name,
      duration,
      fees
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("POST /api/courses ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/courses  (List all courses)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("GET /api/courses ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/courses/:id  (Single course fetch)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error("GET /api/courses/:id ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
