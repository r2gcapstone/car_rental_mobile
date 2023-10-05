import { db, auth } from "../services/firebaseConfig";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

//Delete user rental request
export const deleteRentRequest = async (docId) => {
  try {
    // get the document reference
    const docRef = doc(db, "rentals", docId);

    // delete the document
    await deleteDoc(docRef);

    return { status: "success", message: "Document successfully deleted!" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

//Get rental request based on userId
export const getAllRentals = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    // get rentals reference
    const collectionRef = collection(db, "rentals");

    // Create a query against the collection
    const q = query(collectionRef, where("ownerId", "==", userId));

    // get all rentals
    const rentalSnapshot = await getDocs(q);

    let rentals = [];
    rentalSnapshot.docs.forEach((doc) => {
      const rental = doc.data();

      rentals.push(rental);
    });

    // console.log(JSON.stringify(rentals, null, 2));

    return rentals;
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
