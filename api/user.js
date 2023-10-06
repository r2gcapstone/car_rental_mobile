import { auth, db } from "../services/firebaseConfig";
import { updateDoc, doc, getDoc } from "firebase/firestore";

// Function to update user data from Firestore
export const updateUserData = async (key, value) => {
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

// Function to get user data using its userId
export const getUserData = async (userId) => {
  try {
    const userDoc = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDoc);
    const user = userSnapshot.data();
    return user;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
