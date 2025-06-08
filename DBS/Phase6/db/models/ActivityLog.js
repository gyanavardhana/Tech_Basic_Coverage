const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['borrowed', 'returned', 'searched', 'registered', 'updated']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    bookId: String,
    bookTitle: String,
    bookAuthor: String,
    searchQuery: String,
    ipAddress: String,
    userAgent: String
  }
});

// Create indexes for better query performance
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });
activityLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);