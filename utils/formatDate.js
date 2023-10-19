const formatDate = (timestamp) => {
  var d = timestamp.toDate();

  // Convert to UTC+8
  d.setHours(d.getHours() + 8);

  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
};

export default formatDate;
