import constants from './../constants';

export const getStartOfWeek = (date = new Date()) => {
  date = new Date(date);

  var day = date.getDay() || constants.STARTDAYOFWEEK; // Get current day number, converting Sun. to 7
  date.setUTCHours(0, 0, 0, 0);

  if (day !== constants.STARTDAYOFWEEK) {
    date.setUTCHours(-24 * day, 0, 0, 0);
  }
  return date;
};
