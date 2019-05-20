const mongoose = require('mongoose');
const trackerUtils = require('../utils/trackers');

const tracker = new mongoose.Schema({
  user: { type: String, required: true, index: true },
  title: { type: String, required: true },
  monitorFor: {type: String, enum: ['week', 'month', 'year'], default: 'week'},
  startDate: Date,
  timesPerDay: Number,
  daysPerWeek: { type: Number, min:1, max:7 },
  checkins: [Date],
});

tracker.virtual('stats').get(function() {
  return {
    daily: trackerUtils.calcDailyStats(this),
    weekly: trackerUtils.calcWeeklyStats(this),
    monthly: trackerUtils.calcMonhtlyStats(this),
    yearly: trackerUtils.calcYearlyStats(this)
  };
});

tracker.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Tracker', tracker);
