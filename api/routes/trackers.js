const express = require('express');
const router = express.Router();

/* GET trackers listing. */
router.get('/', function(req, res, next) {
  res.json([]);
});

module.exports = router;
