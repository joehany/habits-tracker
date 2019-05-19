const express = require('express');
const auth = require('./auth');
const createError = require('http-errors')
const router = express.Router();
const Trackers = require('../models/trackers');
const mongoose = require('mongoose');

/* GET trackers listing. */
router.get('/', auth.required, async function(req, res, next) {
  const user = req.payload;
  let trackers = await Trackers.find({ user: user.email})
  res.json(trackers);
});

/* CREATE new tracker. */
router.post('/', auth.required, async function(req, res, next) {
  try {
    const user = req.payload;
    const tracker = req.body;
    console.log(user)
    const newTracker = new Trackers(req.body);
    newTracker.user = user.email;
    let doc = await newTracker.save();
    res.json(doc);
  } catch (err) {
    return next(createError(422, err));
  }
});

router.route('/:id')
      .all(auth.required, async function(req, res, next) {
        const user = req.payload;
        let id;
        try {
          id = mongoose.mongo.ObjectID(req.params.id);
        } catch (err) {
          return next(createError(422, { errors: { id: 'invalid' }}));
        }
        Trackers.findOne({_id: id, user: user.email}, (err, doc) => {
          if(err) {
            return next(createError(500, err));
          } else if(doc == null) {
            return next(createError(404));
          } else {
            req.tracker = doc;
            return next();
          }
        });
      })
      .get((req, res) => {
        res.json(req.tracker);
      })
      .put(async function(req, res, next) {
        try {
          const id = req.tracker.id;
          const doc = await Trackers.findByIdAndUpdate(id, {$set: req.body});
          res.json(doc);
        } catch (err) {
          return next(createError(500, err));
        }
      })
      .delete(async function(req, res, next) {
        const id = req.tracker.id;
        let tracker = await Trackers.findByIdAndDelete(id);
        res.json({success: true});
      });

module.exports = router;
