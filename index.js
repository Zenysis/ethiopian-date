'use strict';

const Exception = function(message) {
   this.message = message;
   this.name = "Exception";
}

const startDayOfEthiopian = function(year) {
  var newYearDay = (year / 100) - (year / 400) - 4;
  // if the prev ethiopian year is a leap year, new-year occrus on 12th
  if ((year - 1) % 4 === 3) {
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

module.exports.toEthiopian = function(year, month, date) {
          /* Ethiopian date object representation of provided Gregorian date
          Params:
          * year: an int
          * month: an int
          * date: an int */

          // prevent incorect input
          var inputs = [year, month, date];
          // if 0 in inputs or [data.__class__ for data in inputs].count(int) != 3:
          if (inputs.length !== 3){
            throw new Exception("Malformed input can't be converted.");
          } //TODO Check for 0 or undefined


          // date between 5 and 14 of May 1582 are invalid
          if (month == 10 && date >= 5 && date <= 14 && year == 1582){
            throw new Exception("Invalid Date between 5-14 May 1582.");
          }

          // Number of days in gregorian months
          // starting with January (index 1)
          // Index 0 is reserved for leap years switches.
          var gregorianMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

          // Number of days in ethiopian months
          // starting with January (index 1)
          // Index 0 is reserved for leap years switches.
          var ethiopianMonths = [0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5, 30, 30, 30, 30];

          // if gregorian leap year, February has 29 days.
          if  ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
            gregorianMonths[2] = 29;
          }

          // September sees 8y difference
          var ethiopianYear = year - 8;

          // if ethiopian leap year pagumain has 6 days
          if (ethiopianYear % 4 == 3){
            ethiopianMonths[10] = 6;
          } else{
            ethiopianMonths[10] = 5;
          }

          // Ethiopian new year in Gregorian calendar
          var newYearDay = startDayOfEthiopian(year - 8);

          // calculate number of days up to that date
          var until = 0;
          for (var i = 1; i < month; i ++){
            until += gregorianMonths[i];
          }
          until += date;

          var tahissas;
          // update tahissas (december) to match january 1st
          if (ethiopianYear % 4 == 0){
            tahissas = 26;
          } else{
            tahissas = 25;
          }

          // take into account the 1582 change
          if (year < 1582){
            ethiopianMonths[1] = 0;
            ethiopianMonths[2] = tahissas;
          } else if (until <= 277 && year == 1582){
            ethiopianMonths[1] = 0;
            ethiopianMonths[2] = tahissas;
          } else {
            tahissas = newYearDay - 3;
            ethiopianMonths[1] = tahissas;
          }

          // calculate month and date incremently
          var m;
          var ethiopianDate;
          for (m = 1; m < ethiopianMonths.length; m++){
            if (until <= ethiopianMonths[m]){
              if (m == 1 || ethiopianMonths[m] == 0){
                ethiopianDate = until + (30 - tahissas);
              } else {
                ethiopianDate = until;
              }
              break;
            }
            else {
              until -= ethiopianMonths[m];
            }
          }

          // if m > 4, we're already on next Ethiopian year
          if (m > 10){
            ethiopianYear += 1;
          }

          // Ethiopian months ordered according to Gregorian
          var order = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4];
          var ethiopianMonth = order[m];
          console.log(ethiopianYear,ethiopianMonth,ethiopianDate);
          // return datetime.date(ethiopian_year, ethiopian_month, ethiopian_date)
}
