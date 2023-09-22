import { db } from "../services/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
// Function to fetch user data from Firestore
const getUserDataFromDatabase = async (userId) => {
  try {
    const ownerDoc = await getDoc(doc(db, "users", userId));

    // Get the owner's data
    const ownerData = ownerDoc.data();

    return ownerData;
  } catch (error) {
    throw error;
  }
};
export default getUserDataFromDatabase;
