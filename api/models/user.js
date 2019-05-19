const mongoose = require('mongoose');
const user = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  createdAt: Date,
});

user.pre('save', function(next) {
  if(this.isNew) {
    this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model('User', user);
