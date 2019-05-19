const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./auth');
const passport = require('passport');

router.post('/login', auth.optional, (req, res, next) => {
  const cred = req.body;

  if(!cred.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!cred.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
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
    return res.status(400).json(info);
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
    res.json(err)
  }
});


router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log(id)
  
  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
