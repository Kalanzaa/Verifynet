const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

// @route   GET api/verification/pending
// @desc    Get all pending claims
// @access  Private
router.get('/pending', async (req, res) => {
  try {
    const pendingClaims = await Tip.find({ status: 'pending' })
      .sort({ createdAt: -1 });
    res.json(pendingClaims);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/verification/:id
// @desc    Submit verification for a claim
// @access  Private
router.post('/:id', async (req, res) => {
  try {
    const { status, notes, sources } = req.body;
    const claim = await Tip.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Update claim with verification data
    claim.status = status;
    claim.verificationNotes = notes;
    claim.sources = sources;
    claim.verifiedBy = req.user.id;
    claim.verifiedAt = Date.now();

    await claim.save();

    res.json(claim);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/verification/history
// @desc    Get verification history
// @access  Private
router.get('/history', async (req, res) => {
  try {
    const verifiedClaims = await Tip.find({
      status: { $ne: 'pending' }
    })
    .sort({ verifiedAt: -1 })
    .populate('verifiedBy', 'name');
    
    res.json(verifiedClaims);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/verification/stats
// @desc    Get verification statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const stats = await Tip.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json(formattedStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 