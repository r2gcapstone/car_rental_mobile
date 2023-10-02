import { db } from "../services/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

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
