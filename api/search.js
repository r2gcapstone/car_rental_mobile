import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";

export const searchAvailableCars = async (filter) => {
  try {
    const carsRef = collection(db, "cars");
    const rentalsRef = collection(db, "rentals");
    let user = auth.currentUser;

    const pendingRentalsSnapshot = await getDocs(
      query(
        rentalsRef,
        where("status", "==", "pending"),
        where("userId", "==", user.uid)
      )
    );
    const pendingRentalsCarIds = pendingRentalsSnapshot.docs.map(
      (doc) => doc.data().carId
    );

    let queryRef = query(
      carsRef,
      where("isSubscribed", "==", true),
      where("isRented", "==", false),
      where("isHidden", "==", false),
      where("status", "==", "approved")
    );

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
          queryRef,
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

      carData.ownerName = ownerData.firstName + " " + ownerData.lastName;

      return { id: carDoc.id, ...carData };
    });

    const availableCars = await Promise.all(availableCarsPromises);

    return availableCars;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
