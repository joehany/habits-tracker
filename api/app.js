const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const { dbConnection, port }  = require('./config');

const authRouters = require('./routes/auth');
const trackersRouter = require('./routes/trackers');

const app = express();

mongoose.connect(dbConnection, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouters);
app.use('/trackers', trackersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.listen(port, ()=> {
  console.log(`Server is running at port ${port}!`);
});
