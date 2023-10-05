//filter functions
const filterData = (data, key, value) => {
  const filteredData = data.filter((item) => item[key] === value);

  return filteredData;
};

export default filterData;
