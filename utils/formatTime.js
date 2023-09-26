const formatTime = (time) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = new Date(time).toLocaleTimeString("en-US", options);

  return formattedTime;
};

export default formatTime;
