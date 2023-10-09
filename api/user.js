import { auth, db } from "../services/firebaseConfig";
import { updatePassword } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import formatDate from "utils/formatDate";

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

export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();
    const currentPassword = userData.password;

    if (user) {
      await updatePassword(user, newPassword);
      return {
        message: "Password update success!",
        error: false,
        status: 200,
      };
    } else {
      throw new Error("No user is currently signed in.");
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

// Function to update all userData
export const updateAllUserData = async (data) => {
  try {
    const user = auth.currentUser;
    const date = new Date();
    const formatedDate = formatDate(date);

    updateDoc(doc(db, "users", user.uid), {
      ...data,
      dateUpdated: formatedDate,
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
