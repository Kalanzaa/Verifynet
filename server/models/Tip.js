const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationScore: {
    type: Number,
    default: 0
  },
  attachments: [{
    type: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
TipSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Tip', TipSchema); 