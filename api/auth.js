import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

const auth = getAuth(app);

// Signup function
export const signup = async (
  firstName,
  lastName,
  address,
  email,
  mobileNumber,
  password,
  imageUrl,
  agreeToTerms
) => {
  try {
    // Signup using createUserWithEmailAndPassword function of firebase
    await createUserWithEmailAndPassword(auth, email, password);

    // Get the user object after signup
    const user = auth.currentUser;

    // Store additional user information in the database
    // Targeting a specific document using user UID
    const userDocRef = doc(db, "users", user.uid);

    // Set the data in the document
    await setDoc(userDocRef, {
      firstName,
      lastName,
      address,
      email,
      mobileNumber,
      imageUrl,
      agreeToTerms,
    });

    return {
      message: "Account successfully created!",
      error: false,
      status: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

// Login function
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return {
      message: "Login success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return {
      message: "Logout success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
