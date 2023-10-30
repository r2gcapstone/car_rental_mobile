import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

export const postReview = async (data, docId) => {
  try {
    let dateCreated = Timestamp.fromDate(new Date());
    // Get a reference to the 'reviews' collection
    const reviewsRef = collection(db, "reviews");
    // Get a reference to the 'rentals' collection
    const docRef = collection(db, "rentals");

    const rentalDoc = doc(docRef, docId);
    await addDoc(reviewsRef, { ...data, dateCreated: dateCreated });
    await updateDoc(rentalDoc, { reviewed: true });

    return {
      message: "review added successfully!",
      error: false,
      status: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
