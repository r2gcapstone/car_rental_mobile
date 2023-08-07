export const toSentenceCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camel case
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words with spaces
};
