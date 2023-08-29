import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const searchAvailableCars = async ({ filter }) => {
  try {
    const filterOptions = filter;
    // console.log("filter:", filterOptions);

    const carsRef = collection(db, "cars");
    let queryRef = query(carsRef);

    // Define an array of filters and their corresponding fields
    const filters = [
      { key: "vehicleType", field: "type" },
      { key: "gearType", field: "gearShift" },
      { key: "fuelType", field: "fuelType" },
      { key: "passengerNum", field: "passengerCount", parseToInt: true },
      { key: "baggageNum", field: "luggageCount", parseToInt: true },
      { key: "priceRate", field: "priceRate", parseToInt: true },
      // Add more filters here based on your requirements
    ];

    // Apply filters based on the filterOptions object
    filters.forEach(({ key, field, parseToInt }) => {
      if (filterOptions[key] !== "default") {
        const value = parseToInt ? +filterOptions[key] : filterOptions[key];
        queryRef = query(queryRef, where(field, "==", value));
      }
    });

    // Execute the query
    const querySnapshot = await getDocs(queryRef);

    const availableCars = [];
    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      // Include additional filtering based on dateTimeValues if needed
      // ...

      availableCars.push({
        id: doc.id,
        ...carData,
      });
    });

    if (!availableCars.length) {
      return {
        message: "No available cars found!",
        status: 204,
      };
    }

    return { searchResults: availableCars };
  } catch (error) {
    console.error("Error searching available cars:", error);
    return { error: true, message: error.message, status: error.code };
  }
};
