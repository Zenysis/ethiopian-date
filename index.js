'use strict';

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

const Exception = function (message) {
  this.message = message;
  this.name = 'Exception';
};

const startDayOfEthiopian = function (year) {
  const newYearDay = ( year / 100.0) - ( year / 400.0) - 4;
  // if the prev ethiopian year is a leap year, new-year occrus on 12th
  return ((year - 1) % 4 === 3) ? newYearDay + 1 : newYearDay;
};

module.exports.toGregorian = function (year, month, date) {

  // prevent incorect input
  const inputs = [year, month, date];
  if (inputs.contains(0) || inputs.contains(null) || inputs.contains(undefined)) {
    throw new Exception("Malformed input can't be converted.");
  }

  // Ethiopian new year in Gregorian calendar
  var newYearDay = startDayOfEthiopian(year);

  // September (Ethiopian) sees 7y difference
  var gregorianYear = year + 7;

  // Number of days in gregorian months
  // starting with September (index 1)
  // Index 0 is reserved for leap years switches.
  var gregorianMonths = [0.0, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];

  // if next gregorian year is leap year, February has 29 days.
  var nextYear = gregorianYear + 1;
  if ((nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0) {
    gregorianMonths[6] = 29;
  }

  // calculate number of days up to that date
  var until = ((month - 1) * 30.0) + date;
  if (until <= 37 && year <= 1575) { // mysterious rule
    until += 28;
    gregorianMonths[0] = 31;
  } else {
    until += newYearDay - 1;
  }

  // if ethiopian year is leap year, paguemain has six days
  if (year - 1 % 4 === 3) {
    until += 1;
  }

  // calculate month and date incremently
  var m = 0;
  var gregorianDate;
  for (var i = 0; i < gregorianMonths.length; i++) {
    if (until <= gregorianMonths[i]) {
      m = i;
      gregorianDate = until;
      break;
    } else {
      m = i;
      until -= gregorianMonths[i];
    }
  }

  // if m > 4, we're already on next Gregorian year
  if (m > 4) {
    gregorianYear += 1;
  }

  // Gregorian months ordered according to Ethiopian
  var order = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  gregorianMonths = order[m];
  gregorianDate = Math.floor(gregorianDate);
  return [gregorianYear, gregorianMonths, gregorianDate];
};

module.exports.toEthiopian = function (year, month, date) {

  // prevent incorect input
  var inputs = [year, month, date];
  if (inputs.contains(0) || inputs.contains(null) || inputs.contains(undefined)) {
    throw new Exception("Malformed input can't be converted.");
  }

  // date between 5 and 14 of May 1582 are invalid
  if (month === 10 && date >= 5 && date <= 14 && year === 1582) {
    throw new Exception('Invalid Date between 5-14 May 1582.');
  }

  // Number of days in gregorian months
  // starting with January (index 1)
  // Index 0 is reserved for leap years switches.
  var gregorianMonths = [0.0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Number of days in ethiopian months
  // starting with January (index 1)
  // Index 0 is reserved for leap years switches.
  var ethiopianMonths = [0.0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5, 30, 30, 30, 30];

  // if gregorian leap year, February has 29 days.
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    gregorianMonths[2] = 29;
  }

  // September sees 8y difference
  var ethiopianYear = year - 8;

  // if ethiopian leap year pagumain has 6 days

  if (ethiopianYear % 4 === 3) {
    ethiopianMonths[10] = 6;
  }

  // Ethiopian new year in Gregorian calendar
  var newYearDay = startDayOfEthiopian(year - 8);

  // calculate number of days up to that date
  var until = 0;
  for (var i = 1; i < month; i++) {
    until += gregorianMonths[i];
  }
  until += date;

  // update tahissas (december) to match january 1st
  var tahissas = (ethiopianYear % 4) === 0 ? 26 : 25;

  // take into account the 1582 change
  if (year < 1582) {
    ethiopianMonths[1] = 0;
    ethiopianMonths[2] = tahissas;
  } else if (until <= 277 && year === 1582) {
    ethiopianMonths[1] = 0;
    ethiopianMonths[2] = tahissas;
  } else {
    tahissas = newYearDay - 3;
    ethiopianMonths[1] = tahissas;
  }

  // calculate month and date incremently
  var m;
  var ethiopianDate;
  for (m = 1; m < ethiopianMonths.length; m++) {
    if (until <= ethiopianMonths[m]) {
      ethiopianDate = (m === 1 || ethiopianMonths[m] === 0) ? until + (30 - tahissas) : until;
      break;
    } else {
      until -= ethiopianMonths[m];
    }
  }

  // if m > 4, we're already on next Ethiopian year
  if (m > 10) {
    ethiopianYear += 1;
  }

  // Ethiopian months ordered according to Gregorian
  const order = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4];
  const ethiopianMonth = order[m];
  ethiopianDate = Math.floor(ethiopianDate);
  return [ethiopianYear, ethiopianMonth, ethiopianDate];
};
