const formatTime = (time) => {
  // Convert seconds and nanoseconds to milliseconds
  var d = time.toDate();

  // Convert to UTC+8
  d.setHours(d.getHours() + 8);

  var hours = "" + d.getHours(),
    minutes = "" + d.getMinutes(),
    midday = "AM";

  if (hours == 0) {
    // the hour '0' should be '12'
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
    midday = "PM";
  }

  if (minutes.length < 2) minutes = "0" + minutes;

  return [hours, minutes].join(":") + " " + midday;
};

export default formatTime;
