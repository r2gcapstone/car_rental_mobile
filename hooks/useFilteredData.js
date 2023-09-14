import { useState, useEffect } from "react";

function useFilteredData(data, id, originName) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const result = data.filter((item) => item[`${originName}_id`] === id);
    setFilteredData(result);
  }, [data, id]);

  return filteredData;
}

export default useFilteredData;
