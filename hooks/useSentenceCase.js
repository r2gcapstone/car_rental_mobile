const useSentenceCase = () => {
  const toSentenceCase = (str) => {
    if (!str || str.trim() === "") {
      return str; // Return empty or undefined values as is
    }

    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return { toSentenceCase };
};

export default useSentenceCase;
