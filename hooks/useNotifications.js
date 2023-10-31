import { useState, useEffect } from "react";
import { getAllRentals, getFinishedRental } from "api/rental";

const useNotifications = () => {
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const getRentingDetails = async () => {
      try {
        let result = await getAllRentals();
        result = result.filter((result) => result.viewed === false);
        setNotifCount(result.length);
      } catch (error) {
        alert(error);
      }
    };

    const finishedRentals = async () => {
      try {
        let result = await getFinishedRental();
        result = result.filter((result) => result.viewed === false);
        setNotifCount((prevCount) => prevCount + result.length);
      } catch (error) {
        alert(error);
      }
    };

    getRentingDetails();
    finishedRentals();
  }, []);

  return notifCount;
};

export default useNotifications;
