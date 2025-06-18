const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

// @route   GET api/crisis/incidents
// @desc    Get crisis incidents with filters
// @access  Public
router.get('/incidents', async (req, res) => {
  try {
    const { timeRange, status } = req.query;
    let query = {};

    // Apply time range filter
    if (timeRange && timeRange !== 'all') {
      const now = new Date();
      let timeFilter = new Date();

      switch (timeRange) {
        case '24h':
          timeFilter.setDate(now.getDate() - 1);
          break;
        case '7days':
          timeFilter.setDate(now.getDate() - 7);
          break;
        case '30days':
          timeFilter.setDate(now.getDate() - 30);
          break;
      }

      query.createdAt = { $gte: timeFilter };
    }

    // Apply status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    const incidents = await Tip.find(query)
      .select('title description location status createdAt')
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/crisis/incidents
// @desc    Report a new crisis incident
// @access  Private
router.post('/incidents', async (req, res) => {
  try {
    const { title, description, location, attachments } = req.body;

    const newIncident = new Tip({
      title,
      content: description,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      attachments: attachments || [],
      status: 'pending'
    });

    const incident = await newIncident.save();
    res.json(incident);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 