const mongoose = require('mongoose');

const tracker = new mongoose.Schema({
  user_email: { type: String, required: true, index: true },
  title: { type: String, required: true },
  monitorFor: {type: String, enum: ['week', 'month', 'year'], default: 'week'},
  startDate: Date,
  timerPerDay: Number,
  daysPerWeek: { type: Number, min:1, max:7 },
  checkins: [Date],
});

module.exports = mongoose.model('Tracker', tracker);
