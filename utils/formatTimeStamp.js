const formatTimestamp = (timestamp) => {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Adjust for timezone (Manila is UTC+8)
  const manilaTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);

  // Extract date, hours, minutes, and seconds
  const month = manilaTime.getUTCMonth() + 1; // Months are zero-based
  const day = manilaTime.getUTCDate();
  const year = manilaTime.getUTCFullYear();

  let hours = manilaTime.getUTCHours();
  const minutes = manilaTime.getUTCMinutes();
  const seconds = manilaTime.getUTCSeconds();

  // Determine AM/PM suffix based on the hour
  const suffix = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the result as "mm/dd/yyyy - hh:mm:ss AM/PM"
  const formattedTime = `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year} - ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${suffix}`;

  return formattedTime;
};

export default formatTimestamp;
