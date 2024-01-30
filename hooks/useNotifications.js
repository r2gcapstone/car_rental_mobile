import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getFinishedRental } from "api/rental";
import { useUserContext } from "context/UserContext";

const useNotifications = () => {
  const [notifCount, setNotifCount] = useState(0);
  const { user } = useUserContext();

  const fetchDataAndUpdateCount = (query, field = "viewed") => {
    const unsubscribe = onSnapshot(query, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        if (!doc.data()[field]) {
          result.push(doc.data());
        }
      });
      setNotifCount((prevCount) => prevCount + result.length);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const rentalsQuery = query(
      collection(db, "rentals"),
      where("ownerId", "==", user.ownerId),
      where("status", "==", "pending")
    );

    const subscriptionQueries = [
      query(
        collection(db, "subscription"),
        where("userId", "==", user.userId),
        where("status", "==", "approved")
      ),
      query(
        collection(db, "subscription"),
        where("userId", "==", user.userId),
        where("viewed", "==", false),
        where("status", "==", "declined")
      ),
      query(
        collection(db, "subscription"),
        where("userId", "==", user.userId),
        where("status", "==", "expired"),
        where("expiredStatus", "==", false)
      ),
    ];

    const carQueries = [
      query(
        collection(db, "cars"),
        where("userId", "==", user.userId),
        where("status", "==", "approved")
      ),
      query(
        collection(db, "cars"),
        where("userId", "==", user.userId),
        where("viewed", "==", false),
        where("status", "==", "declined")
      ),
    ];

    const unsubAllRentals = fetchDataAndUpdateCount(rentalsQuery);
    const unsubAllSub1 = fetchDataAndUpdateCount(subscriptionQueries[0]);
    const unsubAllSub2 = fetchDataAndUpdateCount(subscriptionQueries[1]);
    const unsubAllSub3 = fetchDataAndUpdateCount(subscriptionQueries[2]);
    const unsubAllReg1 = fetchDataAndUpdateCount(carQueries[0]);
    const unsubAllReg2 = fetchDataAndUpdateCount(carQueries[1]);

    const finishedRentals = async () => {
      try {
        let result = await getFinishedRental();
        if (result.length > 0) {
          setNotifCount((prevCount) => prevCount + result.length);
        }
      } catch (error) {
        alert(error);
      }
    };

    finishedRentals();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubAllRentals();
      unsubAllSub1();
      unsubAllSub2();
      unsubAllSub3();
      unsubAllReg1();
      unsubAllReg2();
    };
  }, [user.ownerId]);

  return notifCount;
};

export default useNotifications;
