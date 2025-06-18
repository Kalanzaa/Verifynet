const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

// @route   GET api/dashboard/stats
// @desc    Get dashboard statistics and chart data
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    // Get basic statistics
    const totalTips = await Tip.countDocuments();
    const verifiedClaims = await Tip.countDocuments({ status: 'verified' });
    const pendingVerification = await Tip.countDocuments({ status: 'pending' });
    
    // Get active regions (unique locations in the last 30 days)
    const activeRegions = await Tip.distinct('location').length;

    // Get verification trends (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const trends = await Tip.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Format chart data
    const chartData = {
      labels: trends.map(t => t._id),
      datasets: [{
        label: 'Tips Submitted',
        data: trends.map(t => t.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    res.json({
      stats: {
        totalTips,
        verifiedClaims,
        pendingVerification,
        activeRegions
      },
      chartData
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 