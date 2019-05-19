const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', function(req, res, next) {
  res.json({});
});

router.post('/signup', async function(req, res, next) {
  try {
    let user = new User(req.body);
    let doc = await user.save();
    res.json(doc);

  } catch (err){
    res.json(err)
  }
});

module.exports = router;
