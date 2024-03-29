import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";
import { getUserData } from "./user";

// Signup function
export const signup = async (data) => {
  let dateCreated = new Date();
  dateCreated = Timestamp.fromDate(dateCreated);

  try {
    // Signup using createUserWithEmailAndPassword function of firebase
    await createUserWithEmailAndPassword(auth, data.email, data.password);

    // Get the user object after signup
    const user = auth.currentUser;

    let downloadURL = "";

    if (data.imageUrl) {
      //compress image
      const resizedImageUrl = await resizeImage(data.imageUrl, 640);

      downloadURL = await uploadImage(resizedImageUrl, "userProfile");
    }

    // Use user.uid as the docId
    const userDocRef = doc(db, "users", user.uid);

    // Set the data in the document
    await setDoc(userDocRef, {
      ...data,
      userId: user.uid,
      imageUrl: downloadURL,
      agreeToTerms: true,
      dateCreated,
      deactivatedAt: "",
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
  let date = new Date();
  let dateCreated = Timestamp.fromDate(date);
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Get the user object after signup
    const user = auth.currentUser;

    const ownerData = await getUserData(user.uid);

    // Check if the user is deactivated
    if (ownerData.deactivatedAt !== "") {
      return {
        error: true,
        message: "Account is disabled!",
        status: "disabled",
      };
    }

    // Filter user data for context
    const userData = {
      ownerId: user.uid,
      userId: ownerData.userId,
      firstName: ownerData.firstName,
      middleName: ownerData.middleName,
      lastName: ownerData.lastName,
      address: ownerData.address,
      email: ownerData.email,
      imageUrl: ownerData.imageUrl,
      mobileNumber: ownerData.mobileNumber,
      dateCreated: dateCreated,
    };

    return {
      message: "Login success!",
      error: false,
      status: 200,
      userData: userData,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

export const changePass = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      message: "Change pass request sent, check your email to proceed !",
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

export const SendVerificationCode = async (number, recaptcha) => {
  const phoneProvider = new PhoneAuthProvider(auth);
  const verificationId = await phoneProvider.verifyPhoneNumber(
    number,
    recaptcha.current
  );

  return verificationId;
};

export const VerifyVerificationCode = async (user, verificationId, code) => {
  const credential = PhoneAuthProvider.credential(verificationId, code);

  try {
    const result = await signInWithCredential(auth, credential);
    return result;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
