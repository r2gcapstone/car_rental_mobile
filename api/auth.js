import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import * as FileSystem from "expo-file-system";

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

    // Create a storage reference from our storage service
    const storageRef = ref(storage, `userAvatar/${user.uid}_img.jpeg`);

    // Read the file into memory
    let fileData;
    try {
      fileData = await FileSystem.readAsStringAsync(imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.error("Error reading file: ", error);
    }

    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload the file to Firebase Storage
    const uploadTask = uploadString(storageRef, fileData, "raw", metadata);

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can add code here to handle the progress of the upload
        },
        (error) => {
          // Handle unsuccessful uploads, you may want to reject the promise here
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          console.log("Uploaded a base64 string!");

          // Get the download URL
          const downloadURL = await getDownloadURL(storageRef);
          console.log("File available at", downloadURL);

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

          resolve();
        }
      );
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
