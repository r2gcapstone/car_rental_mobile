import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { router } from "expo-router";

//subscribe function
export const Subscribe = async (data) => {
  let dateCreated = new Date();
  dateCreated = Timestamp.fromDate(dateCreated);
  try {
    const user = auth.currentUser;
    const newData = {
      ...data,
      userId: user.uid,
      status: "pending",
      dateCreated: dateCreated,
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
