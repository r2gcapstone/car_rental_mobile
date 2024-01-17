import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { router } from "expo-router";

//fetch all subscription function
export const getSubscriptionData = async (status, isViewed) => {
  try {
    const userId = auth.currentUser.uid;

    // Get a reference to the 'subscription' collection
    const subscriptionCollection = collection(db, "subscription");

    //query data
    let querySnapshotRef = null;
    if (status === "approved") {
      querySnapshotRef = query(
        subscriptionCollection,
        where("userId", "==", userId),
        where("status", "==", status)
      );
    } else {
      querySnapshotRef = query(
        subscriptionCollection,
        where("userId", "==", userId),
        where("viewed", "==", false)
      );
    }

    //fetch data
    const querySnapshot = await getDocs(querySnapshotRef);

    let subscription = [];
    querySnapshot.docs.forEach((doc) => {
      const sub = doc.data();
      subscription.push({ ...sub });
    });

    return subscription;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
