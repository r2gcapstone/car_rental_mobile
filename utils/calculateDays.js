//Count total days
function countTotalDays(started, ended) {
  // Parse the date strings into Date objects
  const startDate = new Date(started);
  const endDate = new Date(ended);

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDate - startDate);

  // Convert the difference from milliseconds to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export default countTotalDays;
