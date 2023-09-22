import { auth, db } from "../services/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

// Function to fetch user data from Firestore
const updateUserData = async (key, value) => {
  try {
    const user = auth.currentUser;

    updateDoc(doc(db, "users/" + user.uid), {
      [key]: value,
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
export default updateUserData;
