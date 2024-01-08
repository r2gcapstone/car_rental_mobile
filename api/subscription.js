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
import countTotalDays from "utils/calculateDays";
import { updateCarData } from "./cars";

//utils
import uploadImage from "../utils/uploadImage";

//subscribe function
export const Subscribe = async (data) => {
  let dateCreated = new Date();
  dateCreated = Timestamp.fromDate(dateCreated);

  try {
    const user = auth.currentUser;

    let receiptImg = "";
    try {
      receiptImg = await uploadImage(data.receiptImg, "receipt");
    } catch (error) {
      alert(error);
    }

    const newData = {
      ...data,
      userId: user.uid,
      status: "pending",
      dateCreated: dateCreated,
      receiptImg: receiptImg,
    };

    // Get a reference to the 'rentals' collection
    const subscriptionCollection = collection(db, "subscription");

    // Query for documents where carId and userId fields match the current carId and userId
    const q = query(
      subscriptionCollection,
      where("carId", "==", data.carId),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    let alertShown = false;
    querySnapshot.forEach((doc) => {
      if (!alertShown) {
        if (doc.data().status === "pending") {
          alert(
            "You still have a pending request for this vehicle. Please wait for the response!"
          );
          router.push("/");
          alertShown = true;
        }
        if (doc.data().status === "approved") {
          alert(
            `You still have ${
              doc.data().duration
            } day(s) remaining in your subscription. Please try again after it expires!`
          );
          router.push("/");
          alertShown = true;
        }
      }
    });

    if (!alertShown) {
      // Add a new document with an auto-generated id
      await addDoc(subscriptionCollection, newData);

      return {
        message: "Subscription request successfully created!",
        error: false,
        status: 201,
      };
    }
  } catch (error) {
    alert(error);
    return { error: true, message: error.message, status: error.code };
  }
};

//fetch all subscription function
export const getAllSubscription = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    let currentDate = new Date();

    // Get a reference to the 'subscription' collection
    const subscriptionCollection = collection(db, "subscription");

    const querySnapshot = await getDocs(
      subscriptionCollection,
      where("userId", "==", userId)
    );

    let subscription = [];
    querySnapshot.docs.forEach((doc) => {
      const sub = doc.data();
      let days = 0;
      let remainingDays = 0;

      const dateCreated = sub.dateCreated;
      const duration = sub.duration;
      if (currentDate > dateCreated) {
        days = countTotalDays(dateCreated.toDate(), currentDate);
        if (days < duration) {
          remainingDays = duration - days;
          updateSubscriptionData("remainingDays", remainingDays, doc.id);
        }
      }

      // Only push the subscription if status is not 'pending'
      if (sub.status !== "pending") {
        subscription.push({ ...sub, remainingDays: remainingDays });
      }
    });

    return subscription;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//update vehicle information
export const updateSubscriptionData = async (key, value, docId) => {
  let dateUpdated = new Date();
  dateUpdated = Timestamp.fromDate(dateUpdated);

  try {
    await updateDoc(doc(db, "subscription", docId), {
      [key]: value,
      dateUpdated: value && dateUpdated,
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

//update subscription status when it expires
//Note: not recommended but it works for now
export const updateSubscription = async () => {
  try {
    let currentDate = new Date();
    // Get a reference to the 'subscription' collection
    const subscriptionCollection = collection(db, "subscription");

    const querySnapshot = await getDocs(subscriptionCollection);

    querySnapshot.docs.forEach((doc) => {
      const sub = doc.data();
      let days = 0;

      const dateCreated = sub.dateCreated;
      const duration = sub.duration;

      if (currentDate > dateCreated) {
        days = countTotalDays(dateCreated.toDate(), currentDate);
        if (days > duration) {
          //reset days to 0 when expiration is hit
          //Not Recommended for realtime data changes
          updateCarData("isSubscribed", false, sub.carId);
          updateSubscriptionData("remainingDays", 0, doc.id);
        }
      }
    });

    return {
      message: "update success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
