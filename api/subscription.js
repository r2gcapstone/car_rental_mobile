import { db, auth } from "../services/firebaseConfig";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

//subscribe function
export const Subscribe = async (data) => {
  try {
    const user = auth.currentUser;
    const newData = { ...data, userId: user.uid };
    // Get a reference to the 'rentals' collection
    const subscriptionCollection = collection(db, "subscription");

    // Add a new document with an auto-generated id
    await addDoc(subscriptionCollection, newData);

    return {
      message: "subscription request successfully created!",
      error: false,
      status: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//fetch all subscription function
export const getAllSubscription = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    // Get a reference to the 'subscription' collection
    const subscriptionCollection = collection(db, "subscription");

    const querySnapshot = await getDocs(
      subscriptionCollection,
      where("userId", "==", userId)
    );

    let subscription = [];
    querySnapshot.docs.forEach((doc) => {
      const sub = doc.data();

      // Only push the subscription if status is not 'pending'
      if (sub.status !== "pending") {
        subscription.push(sub);
      }
    });

    return subscription;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
