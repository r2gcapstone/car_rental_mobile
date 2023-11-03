import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getFinishedRental } from "api/rental";
import { useUserContext } from "context/UserContext";

const useNotifications = () => {
  const [notifCount, setNotifCount] = useState(0);
  const { user } = useUserContext();
  // Get rentals reference
  const collectionRef = collection(db, "rentals");

  useEffect(() => {
    const q1 = query(
      collectionRef,
      where("ownerId", "==", user.ownerId),
      where("status", "==", "pending")
    );

    const unsubAllRentals = onSnapshot(q1, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        if (!doc.data().viewed) {
          result.push(doc.data());
        }
      });
      setNotifCount(result.length);
    });

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
    };
  }, []);

  return notifCount;
};

export default useNotifications;
