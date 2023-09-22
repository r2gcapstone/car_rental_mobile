import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";

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
  let dateCreated = new Date();
  const deactivatedAt = "";
  const formattedDate = dateCreated.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  dateCreated = formattedDate;

  try {
    // Signup using createUserWithEmailAndPassword function of firebase
    await createUserWithEmailAndPassword(auth, email, password);

    // Get the user object after signup
    const user = auth.currentUser;

    //compress image
    const resizedImageUrl = await resizeImage(imageUrl, 640);

    // This line waits for uploadImageAsync to finish
    // Arguments: resizedImageUrl (string - uri data),  storageName (string)
    const downloadURL = await uploadImage(resizedImageUrl, "userProfile");

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
      imageUrl: downloadURL,
      agreeToTerms,
      dateCreated,
      deactivatedAt,
      password,
    });

    return {
      message: "Account successfully created!",
      error: false,
      status: 201,
    };
  } catch (error) {
    console.log(error);
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
