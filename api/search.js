import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const searchAvailableCars = async (filter) => {
  try {
    const carsRef = collection(db, "cars");
    const rentalsRef = collection(db, "rentals");

    // Get all rentals with pending status
    const pendingRentalsSnapshot = await getDocs(
      query(rentalsRef, where("status", "==", "pending"))
    );
    const pendingRentalsCarIds = pendingRentalsSnapshot.docs.map(
      (doc) => doc.data().carId
    );

    // Initialize queryRef with carsRef and default filter
    let queryRef = query(
      carsRef,
      where("subscriptionStatus", "==", "subscribed"),
      where("status", "==", "not booked"),
      where("isHidden", "==", false)
    );

    // Add the not-in condition only if there are pending rentals
    if (pendingRentalsCarIds.length > 0) {
      queryRef = query(
        queryRef,
        where("__name__", "not-in", pendingRentalsCarIds)
      );
    }

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
          carsRef,
          where(`vehicleDetails.${field}`, "==", value)
        );
      }
    }

    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.size === 0) {
      return [];
    }

    const availableCarsPromises = querySnapshot.docs.map(async (carDoc) => {
      const carData = carDoc.data();

      const ownerDoc = await getDoc(doc(db, "users", carData.userId));
      const ownerData = ownerDoc.data();

      carData.ownerName = ownerData.firstName || "Owner";

      return { id: carDoc.id, ...carData };
    });

    const availableCars = await Promise.all(availableCarsPromises);

    return availableCars;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
