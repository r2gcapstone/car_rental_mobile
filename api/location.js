import { db, auth } from "../services/firebaseConfig";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

// Function to update rented vehicle location bases on docId
// export const updateRentalData = async (location, docId) => {
//   try {
//     const docRef = doc(db, "rentals/", docId);

//     if (typeof location !== "string") {
//       await updateDoc(docRef, {
//         location: location,
//       });
//     } else {
//       await updateDoc(docRef, {
//         "location.status": location,
//       });
//     }

//     return {
//       message: "update success!",
//       error: false,
//       status: 200,
//     };
//   } catch (error) {
//     return { error: true, message: error.message, status: error.code };
//   }
// };
export const updateLocation = async (location, docId) => {
  try {
    const docRef = doc(db, "rentals/", docId);

    let rentalData = {};

    if (typeof location !== "string") {
      rentalData = {
        location: location,
      };
    } else {
      rentalData = {
        "location.status": location,
      };
    }

    // Fetch the current document data
    const docSnapshot = await getDoc(docRef);
    const currentData = docSnapshot.data();

    // Update location history
    const currentHistory = currentData?.locationHistory || [];
    const newHistory = [...currentHistory, location];

    // Retain only the latest 5 entries
    const trimmedHistory = newHistory.slice(-5);

    // Update the document with the new location and history
    await updateDoc(docRef, {
      ...rentalData,
      locationHistory: trimmedHistory,
    });

    return {
      message: "update success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
