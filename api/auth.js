import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

// Signup function
export const signup = async (
  firstName,
  lastName,
  address,
  email,
  mobileNumber,
  password,
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
      agreeToTerms,
    });

    return {
      error: false,
      status: 201,
      message: "Account successfully created!",
    };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.message, status: error.code };
  }
};
