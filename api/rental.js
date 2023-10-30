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
  Timestamp,
} from "firebase/firestore";

//Rent a car function
export const RentCar = async (data) => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const ownerId = data.rentInformation.ownerId;

    const rentalsCollection = collection(db, "rentals");
    const usersCollection = collection(db, "users");

    const userDoc = doc(usersCollection, ownerId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const ownerName = userData.firstName;

      const dateCreated = Timestamp.now();

      const rentalData = {
        ...data.rentInformation,
        status: "pending",
        userId,
        reviewed: false,
        ownerName,
        dateCreated,
        dateTime: {
          startDate: Timestamp.fromDate(
            new Date(data.rentInformation.dateTime.startRentDate.seconds * 1000)
          ),
          startTime: Timestamp.fromDate(
            new Date(data.rentInformation.dateTime.startRentTime.seconds * 1000)
          ),
          endDate: Timestamp.fromDate(
            new Date(data.rentInformation.dateTime.endRentDate.seconds * 1000)
          ),
          endTime: Timestamp.fromDate(
            new Date(data.rentInformation.dateTime.endRentTime.seconds * 1000)
          ),
        },
      };

      const docRef = await addDoc(rentalsCollection, rentalData);
      rentalData.docId = docRef.id;
      await updateDoc(docRef, rentalData);

      return {
        message: "Rent request successfully created!",
        error: false,
        status: 201,
      };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//handle applicant rental request
export const rentalRequest = async (docId, value, carId) => {
  try {
    // get the document reference
    const docRef = doc(db, "rentals", docId);

    await updateDoc(docRef, {
      status: value,
    });

    // If the status is approved, update the status of the car to 'booked'
    if (value === "approved") {
      const carDocRef = doc(db, "cars", carId);
      await updateDoc(carDocRef, {
        status: "booked",
      });
    }

    return {
      status: "success",
      message: "Renting application status updated!",
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

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
    let currentDate = new Date();

    // Get rentals reference
    const collectionRef = collection(db, "rentals");

    // Create a query against the collection
    const q = query(
      collectionRef,
      where("ownerId", "==", userId),
      where("status", "==", "pending")
    );

    // Get all rentals
    const rentalSnapshot = await getDocs(q);

    let rentals = [];

    // Use map instead of forEach to return an array of promises
    const rentalPromises = rentalSnapshot.docs.map(async (doc) => {
      let rental = doc.data();

      // Check if 24 hours have passed since dateCreated
      const dateCreated = rental.dateCreated.toDate();

      if (currentDate - dateCreated <= 24 * 60 * 60 * 1000) {
        // Calculate the remaining hours
        let remainingHours = Math.floor(
          (24 * 60 * 60 * 1000 - (currentDate - dateCreated)) / (60 * 60 * 1000)
        );

        // Add a new key with the remaining hours as value
        rental.remainingHours = remainingHours;

        // Append the rental object to the rentals array
        rentals.push(rental);
      } else {
        await updateRentalDataField("status", "declined", doc.id);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(rentalPromises);

    return rentals;
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

//function to get Renting docs based on userId
export const getRentingDocs = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    // Get a reference to the 'rentals' collection
    const rentalsRef = collection(db, "rentals");

    // Create a query against the collection
    const q = query(rentalsRef, where("userId", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // If no rentals were found, return a message indicating this
    if (querySnapshot.empty) {
      return {
        error: false,
        message: "No rental records found!",
        status: 204,
      };
    }

    // You can use the docs property of the querySnapshot object to get all the documents in the result
    const docs = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return docs;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

// Function to get a vehicle(via user gps phone) location using document id
export const getMyRentalLoc = async (carId) => {
  try {
    // Get a reference to the 'rentals' collection
    const rentalsRef = collection(db, "rentals");

    // Create a query against the collection
    const q = query(rentalsRef, where("carId", "==", carId));

    const snapshot = await getDocs(q);

    // Initialize an empty array to hold the results
    let results = [];

    // Loop through each document in the snapshot
    snapshot.forEach((doc) => {
      // Push the data of each document into the results array
      results.push(doc.data());
    });

    return results[0];
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

// Function to update rented vehicle location bases on docId
export const updateRentalData = async (location, docId) => {
  try {
    const docRef = doc(db, "rentals/", docId);

    if (typeof location !== "string") {
      await updateDoc(docRef, {
        location: location,
      });
    } else {
      await updateDoc(docRef, {
        "location.status": location,
      });
    }

    return {
      message: "update success!",
      error: false,
      status: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

export const updateRentalDataField = async (key, value, docId) => {
  try {
    const docRef = doc(db, "rentals/", docId);

    await updateDoc(docRef, {
      [key]: value,
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

//Get notification for finished rental using userId
export const getFinishedRental = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    let currentDate = new Date();

    // Get rentals reference
    const collectionRef = collection(db, "rentals");

    // Create a query against the collection
    const q = query(
      collectionRef,
      where("userId", "==", userId),
      where("reviewed", "==", false)
    );

    // Get all rentals
    const rentalSnapshot = await getDocs(q);

    let rentals = [];

    // Use map instead of forEach to return an array of promises
    const rentalPromises = rentalSnapshot.docs.map(async (doc) => {
      let rental = doc.data();

      const endDate = rental.dateTime.endDate.toDate();
      const status = rental.status;

      if (
        (currentDate >= endDate && status === "approved") ||
        status === "finished"
      ) {
        rentals.push(rental);
        await updateRentalDataField("status", "finished", doc.id);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(rentalPromises);

    return rentals;
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
