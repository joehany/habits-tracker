const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./auth');
const passport = require('passport');
const createError = require('http-errors')

router.post('/login', auth.optional, (req, res, next) => {
  const cred = req.body;
 
  if(!cred.email) {
    return next(createError(422, {
      errors: {
        email: 'is required',
      },
    }));
  }

  if(!cred.password) {
    return next(createError(422, {
      errors: {
        password: 'is required',
      },
    }));
  }

  return passport.authenticate('local', (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
    // Wrong email or password
    return next(createError(400, info));
  })(req, res, next);
});

router.get('/users', (req,res) => {
  User.find({}, (err, docs) => {
    res.json(docs)
  })
})

router.post('/signup', auth.optional, async function(req, res, next) {
  try {
    let newUser = new User(req.body);
    newUser.setPassword(req.body.password);
    let doc = await newUser.save();
    res.json(doc.toAuthJSON());
  } catch (err){
    if(err.code === 11000) {
      return next(createError(422, {
        errors: {
          email: 'is already exist',
        },
      }));
    }
    return next(createError(500, err));
  }
});


router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log(payload)
  
  return User.findById(id)
    .then((user) => {
      if(!user) {
        return next(createError(400));
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
