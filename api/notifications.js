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
  // console.log(status);
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
        where("status", "==", "approved")
      );
    } else if (status === "declined") {
      querySnapshotRef = query(
        subscriptionCollection,
        where("userId", "==", userId),
        where("viewed", "==", false),
        where("status", "==", "declined")
      );
    } else if (status === "expired") {
      querySnapshotRef = query(
        subscriptionCollection,
        where("userId", "==", userId),
        where("status", "==", "expired"),
        where("expiredStatus", "==", false)
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

export const getVehicleRegistrationlData = async (status, isViewed) => {
  try {
    const userId = auth.currentUser.uid;

    // Get a reference to the 'cars' collection
    const carsCollection = collection(db, "cars");

    //query data
    let querySnapshotRef = null;
    if (status == "approved") {
      querySnapshotRef = query(
        carsCollection,
        where("userId", "==", userId),
        where("status", "==", "approved")
      );
    } else if (status == "declined") {
      querySnapshotRef = query(
        carsCollection,
        where("userId", "==", userId),
        where("viewed", "==", false),
        where("status", "==", "declined")
      );
    }

    //fetch data
    const querySnapshot = await getDocs(querySnapshotRef);

    let regCarsRequest = [];
    querySnapshot.docs.forEach((doc) => {
      const carsReg = doc.data();
      regCarsRequest.push({ ...carsReg });
    });

    return regCarsRequest;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
