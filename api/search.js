// Import necessary functions from Firebase Firestore and Auth
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getAuth } from "@firebase/auth";

// Define the searchAvailableCars function
export const searchAvailableCars = async ({ filter }) => {
  try {
    // Store the filter options
    const filterOptions = filter;

    // Get a reference to the 'cars' collection
    const carsRef = collection(db, "cars");
    let queryRef = query(carsRef);

    // Define the filters and their corresponding fields in the database
    const filters = [
      { key: "vehicleType", field: "vehicleType" },
      { key: "gearType", field: "gearType" },
      { key: "fuelType", field: "fuelType" },
      { key: "passengerNum", field: "passengerCount", parseToInt: true },
      { key: "baggageNum", field: "luggageCount", parseToInt: true },
      { key: "priceRate", field: "priceRate", parseToInt: true },
    ];

    // Apply the filters to the query
    filters.forEach(({ key, field, parseToInt }) => {
      if (filterOptions[key] !== "") {
        const value = parseToInt ? +filterOptions[key] : filterOptions[key];
        queryRef = query(queryRef, where(field, "==", value));
      }
    });

    // Execute the query
    const querySnapshot = await getDocs(queryRef);

    if (!Array.isArray(querySnapshot.docs)) {
      console.error("Error: querySnapshot.docs is not an array");
      return;
    }
    // For each document in the querySnapshot, get the owner's name and add it to the car data
    // For each document in the querySnapshot, get the owner's name and add it to the car data
    const availableCarsPromises = querySnapshot.docs.map(async (carDoc) => {
      const carData = carDoc.data();

      // Get the owner's document from the 'users' collection
      const ownerDoc = await getDoc(doc(db, "users", carData.userId));

      // Get the owner's data
      const ownerData = ownerDoc.data();

      // Add the owner's name to the car data
      carData.ownerName = ownerData.firstName;

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
    console.log(JSON.stringify(availableCars, null, 2));
    return { searchResults: availableCars };
  } catch (error) {
    // If an error occurred, log it and return an error message
    console.error("Error searching available cars:", error);
    return { error: true, message: error.message, status: error.code };
  }
};
