'use strict';

const Exception = function(message) {
   this.message = message;
   this.name = "Exception";
}

const startDayOfEthiopian = function(year) {
  var newYearDay = (year / 100) - (year / 400) - 4;
  // if the prev ethiopian year is a leap year, new-year occrus on 12th
  if ((year - 1) % 4 == 3) {
    newYearDay += 1;
  }
  return newYearDay;
};

module.exports.toGregorian = function(year, month, date){
      /* Gregorian date object representation of provided Ethiopian date
      Params:
      * year: an int
      * month: an int
      * date: an int */

      // prevent incorect input
      var inputs = [year, month, date];
      if (inputs.length !== 3) //TODO Check for 0 or undefined
          throw new Exception("Malformed input can't be converted.");

      // Ethiopian new year in Gregorian calendar
      var newYearDay = startDayOfEthiopian(year);

      // September (Ethiopian) sees 7y difference
      var gregorianYear = year + 7;

      // Number of days in gregorian months
      // starting with September (index 1)
      // Index 0 is reserved for leap years switches.
      var gregorianMonths = [0, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];

      // if next gregorian year is leap year, February has 29 days.
      var nextYear = gregorianYear + 1;
      if ((nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 == 0){
        gregorianMonths[6] = 29;
      }

      // calculate number of days up to that date
      var until = ((month - 1) * 30) + date;
      if (until <= 37 && year <= 1575){ // mysterious rule
        until += 28;
        gregorianMonths[0] = 31;
      } else {
        until += newYearDay - 1;
      }

      // if ethiopian year is leap year, paguemain has six days
      if (year - 1 % 4 === 3){
        until += 1;
      }

      // calculate month and date incremently
      var m = 0;
      var gregorianDate;
      for (var i = 0; i< gregorianMonths.length; i++){
          if (until <= gregorianMonths[i]){
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
      console.log(gregorianYear,gregorianMonths,gregorianDate);
      // return datetime.date(gregorian_year, gregorian_month, gregorian_date)
    }
