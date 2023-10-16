// Import necessary functions from Firebase Firestore and Auth
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";

// Define the searchAvailableCars function
export const searchAvailableCars = async ({ ...filter }) => {
  try {
    // Store the filter options
    const filterOptions = filter;

    const user = auth.currentUser;
    const userId = user.uid;

    // Get a reference to the 'cars' collection
    const carsRef = collection(db, "cars");

    // Initialize queryRef with carsRef  and default filter
    let queryRef = query(carsRef, where("userId", "!=", userId));
    queryRef = query(carsRef, where("subscriptionStatus", "==", "subscribed"));
    queryRef = query(carsRef, where("isHidden", "==", false));

    // Define the filters and their corresponding fields in the database
    const filters = [
      { key: "vehicleType", field: "vehicleType" },
      { key: "gearType", field: "gearType" },
      { key: "fuelType", field: "fuelType" },
      { key: "passengerCount", field: "passengerCount", parseToInt: true },
      { key: "luggageCount", field: "luggageCount", parseToInt: true },
      { key: "priceRate", field: "priceRate", parseToInt: true },
    ];

    // Apply the filters to the query
    filters.forEach(({ key, field, parseToInt }) => {
      if (filterOptions[key] !== "") {
        const value = parseToInt ? +filterOptions[key] : filterOptions[key];

        // Use dot notation to specify fields within vehicleDetails
        queryRef = query(
          queryRef,
          where(`vehicleDetails.${field}`, "==", value)
        );
      }
    });

    // Execute the query
    const querySnapshot = await getDocs(queryRef);

    // For each document in the querySnapshot, get the owner's name and add it to the car data
    const availableCarsPromises = querySnapshot.docs.map(async (carDoc) => {
      const carData = carDoc.data();

      // Get the owner's document from the 'users' collection
      const ownerDoc = await getDoc(doc(db, "users", carData.userId));

      // Get the owner's data
      const ownerData = ownerDoc.data();

      // Add the owner's name to the car data
      carData.ownerName = ownerData.firstName || "Owner";

      // Return the car data
      return {
        id: carDoc.id,
        ...carData,
      };
    });

    // Wait for all promises to resolve
    const availableCars = await Promise.all(availableCarsPromises);

    // If no cars were found, return a message indicating this
    if (!availableCars.length) {
      return {
        message: "No available cars found!",
        status: 204,
      };
    }

    // Return the available cars
    return { searchResults: availableCars };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
