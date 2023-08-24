import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Assuming you have a module exporting your Firestore instance

export const searchAvailableCars = async () => {
  try {
    // const { filter: filterOptions } = filter;

    const carsRef = collection(db, "cars");
    let queryRef = query(carsRef);

    // Apply filters based on the filterOptions object

    // if (filterOptions.vehicleType !== "default") {
    //   queryRef = query(queryRef, where("type", "==", filterOptions.vehicleType));
    // }
    // if (filterOptions.fuelType !== "default") {
    //   queryRef = query(queryRef, where("fuelType", "==", filterOptions.fuelType));
    // }

    // Add more filters here based on your requirements

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

    return availableCars;

    // return querySnapshot;
  } catch (error) {
    console.error("Error searching available cars:", error);
    throw new Error("An error occurred while searching for available cars.");
  }
};
