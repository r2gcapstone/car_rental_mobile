import { auth, db } from "../services/firebaseConfig";
import { updatePassword, updateEmail } from "firebase/auth";
import { updateDoc, doc, getDoc, Timestamp } from "firebase/firestore";

//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";

// Function to update single field in user data from Firestore
export const updateSpecificFeild = async (key, value) => {
  try {
    const user = auth.currentUser;

    // Create the update data
    let updateData = {};
    updateData[`${key}.municipality`] = value;

    updateDoc(doc(db, "users/" + user.uid), updateData);

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

// Function to update all field of userData
export const updateAllUserData = async (data) => {
  try {
    const user = auth.currentUser;
    const date = new Date();
    const dateUpdated = Timestamp.fromDate(date);

    // update email in auth
    if (data.email) {
      try {
        await updateEmail(user, data.email);
      } catch (error) {
        alert(error);
      }
    }

    let image = data.imageUrl;
    if (data.imageUrl.startsWith("file://")) {
      try {
        const result = await updateUserImage(data.imageUrl);
        //replace with new image
        image = result.imageUrl;
      } catch (error) {
        console.log(error);
      }
    }

    await updateDoc(doc(db, "users", user.uid), {
      ...data,
      imageUrl: image,
      dateUpdated: dateUpdated,
    });

    return {
      message: "update success!",
      error: false,
      status: 200,
      imageUrl: image,
    };
  } catch (error) {
    alert(error);
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

//update user profile
export const updateUserImage = async (value) => {
  try {
    const resizedImageUrl = await resizeImage(value, 640);
    const downloadURL = await uploadImage(resizedImageUrl, "userProfile");

    return {
      imageUrl: downloadURL,
      message: "update success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
