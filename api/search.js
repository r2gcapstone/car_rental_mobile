import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";

export const searchAvailableCars = async (filter) => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const carsRef = collection(db, "cars");

    // Initialize queryRef with carsRef  and default filter
    let queryRef = query(carsRef, where("userId", "!=", userId));
    queryRef = query(carsRef, where("subscriptionStatus", "==", "subscribed"));
    queryRef = query(carsRef, where("isHidden", "==", false));

    const filters = [
      { key: "vehicleType", field: "vehicleType" },
      { key: "gearType", field: "gearType" },
      { key: "fuelType", field: "fuelType" },
      { key: "passengerCount", field: "passengerCount", parseToInt: true },
      { key: "luggageCount", field: "luggageCount", parseToInt: true },
      { key: "priceRate", field: "priceRate", parseToInt: true },
    ];

    for (const { key, field, parseToInt } of filters) {
      if (filter[key] !== "") {
        const value = parseToInt ? +filter[key] : filter[key];
        queryRef = query(
          queryRef,
          where(`vehicleDetails.${field}`, "==", value)
        );
      }
    }

    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.size === 0) {
      return { searchResults: [] };
    }

    const availableCarsPromises = querySnapshot.docs.map(async (carDoc) => {
      const carData = carDoc.data();
      const ownerDoc = await getDoc(doc(db, "users", carData.userId));
      const ownerData = ownerDoc.data();
      carData.ownerName = ownerData.firstName || "Owner";
      return { id: carDoc.id, ...carData };
    });

    const availableCars = (await Promise.all(availableCarsPromises)).filter(
      (car) => car.subscriptionStatus === "subscribed"
    );
    // console.log(JSON.stringify(availableCars, null, 2));

    return { searchResults: availableCars };
  } catch (error) {
    // If an error occurred, log it and return an error message
    console.error("Error searching available cars:", error);
    return { error: true, message: error.message, status: error.code };
  }
};
