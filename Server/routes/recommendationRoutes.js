const express = require('express');
const { recommendCourse } = require('../ai'); // Ensure this function exists and is correctly implemented
const router = express.Router();

// API route to get a course recommendation
router.post('/recommend', async (req, res) => {
  const { education, interests } = req.body; // Input data
  try {
    const recommendation = await recommendCourse({ education, interests });
    res.json({ recommendedCourse: recommendation });
  } catch (error) {
    console.error('Error recommending course:', error);
    res.status(500).json({ error: 'Failed to recommend a course' });
  }
});

module.exports = router;
