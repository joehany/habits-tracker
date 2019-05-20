const moment = require('moment');
const _ = require('underscore');

function calcDailyStats(tracker) {
  const today = new moment();
  const todayChecks = _.filter(tracker.checkins, d => {
    return today.format("YYYY-MM-DD") === moment(d).format("YYYY-MM-DD");
  }).length;
  return {
    checks: todayChecks,
    percent: (todayChecks / tracker.timesPerDay * 100).toFixed(2)
  };
}

function calcWeeklyStats(tracker) {
  const today = moment().endOf('day');
  const startOfWeek = moment().startOf('week');
  const days = today.diff(startOfWeek, 'days');
  const checks = _.filter(tracker.checkins, d => {
    return moment(d).isBetween(startOfWeek, today);
  }).length;
  const weekRequiredChecks = tracker.timesPerDay * tracker.daysPerWeek;
  const percent = (checks / weekRequiredChecks * 100).toFixed(2);
  const missed = (days * tracker.timesPerDay) - checks;
  const rest = weekRequiredChecks - (days * tracker.timesPerDay) 
  return {
    checks,
    percent,
    missed,
    rest,
  };
}

function calcMonhtlyStats(tracker) {
  const today = moment().endOf('day')
  const endOfMonth = moment().endOf('month');
  let startOfMonth = moment().startOf('month');
  const startDate = moment(tracker.startDate);

  if (startOfMonth < startDate) {
    startOfMonth = startDate;
  }
  const weeks = Math.ceil(moment.duration(endOfMonth.diff(startOfMonth)).asWeeks());
  
  const checks = _.filter(tracker.checkins, d => {
    return moment(d).isBetween(startOfMonth, today);
  }).length;

  const monthRequiredChecks = tracker.timesPerDay * tracker.daysPerWeek * weeks;
  const percent = (checks / monthRequiredChecks * 100).toFixed(2);

  return {
    checks,
    percent,
  };
}

function calcYearlyStats(tracker) {
  const today = moment().endOf('day')
  const endOfYear = moment().endOf('year');
  let startOfYear = moment().startOf('year');
  const startDate = moment(tracker.startDate);

  if (startOfYear < startDate) {
    startOfYear = startDate;
  }

  const weeks = Math.ceil(moment.duration(endOfYear.diff(startDate)).asWeeks());
  const checks = _.filter(tracker.checkins, d => {
    return moment(d).isBetween(startOfYear, today);
  }).length;

  const yearRequiredChecks = tracker.timesPerDay * tracker.daysPerWeek * weeks;
  const percent = (checks / yearRequiredChecks * 100).toFixed(2);

  return {
    checks,
    percent,
  };
}

module.exports = {
  calcDailyStats,
  calcWeeklyStats,
  calcMonhtlyStats,
  calcYearlyStats
}