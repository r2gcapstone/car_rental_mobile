import { db, app } from "../services/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";

const auth = getAuth(app);
//POST
//register car function
export const RegisterCar = async ({ data }) => {
  let dateCreated = new Date();
  dateCreated = Timestamp.fromDate(dateCreated);

  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const carsCollection = collection(db, "cars");

    // Create a copy of data to avoid mutation
    const dataCopy = JSON.parse(JSON.stringify(data));

    // Create an array to hold promises
    const promises = [];

    // Loop through imageUrls and documents
    for (let key in dataCopy.imageUrls) {
      if (dataCopy.imageUrls.hasOwnProperty(key)) {
        // Get the image URL
        const imageUrl = dataCopy.imageUrls[key];

        // Create a promise for each image processing task
        const promise = resizeImage(imageUrl, 640)
          .then((resizedImageUrl) => uploadImage(resizedImageUrl, "cars"))
          .then((downloadURL) => {
            // Update the data with the download URL
            dataCopy.imageUrls[key] = downloadURL;
          })
          .catch((error) => alert(error));

        // Add the promise to the array
        promises.push(promise);
      }
    }

    for (let key in dataCopy.document) {
      if (dataCopy.document.hasOwnProperty(key)) {
        // Get the image URL
        const imageUrl = dataCopy.document[key];

        // Create a promise for each image processing task
        const promise = resizeImage(imageUrl, 640)
          .then((resizedImageUrl) => uploadImage(resizedImageUrl, "document"))
          .then((downloadURL) => {
            // Update the data with the download URL
            dataCopy.document[key] = downloadURL;
          })
          .catch((error) => alert(error));

        // Add the promise to the array
        promises.push(promise);
      }
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    const carData = { ...dataCopy, userId, rented: false };

    // Add a new document with an auto-generated id
    const docRef = await addDoc(carsCollection, carData);

    // Get the auto-generated id
    const carId = docRef.id;

    // Update the document to include the carId
    await updateDoc(docRef, {
      carId,
      subscriptionStatus: "not subscribed",
      status: "not booked",
      isHidden: false,
      location: { status: "off" },
      dateCreated: dateCreated,
    });

    return {
      message: "Vehicle successfully registered!",
      error: false,
      status: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
//GET
//get review function
export const getReviews = async (carId) => {
  try {
    // Get a reference to the 'reviews' collection
    const reviewsRef = collection(db, "reviews");
    // Initialize queryRef with reviewsRef
    let queryRef = reviewsRef;

    // Add a where clause to get reviews of the specific car
    queryRef = query(queryRef, where("carId", "==", carId));

    // Get the reviews
    const querySnapshot = await getDocs(queryRef);
    const reviews = querySnapshot.docs.map((doc) => doc.data());

    return reviews;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//function get all vehicles for search vehicle feature
export const getCars = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    // Get a reference to the 'cars' collection
    const carsRef = collection(db, "cars");

    // Create a query against the collection
    const q = query(carsRef, where("userId", "==", userId));

    // Execute the query
    const vehicleSnapshot = await getDocs(q);

    // Map over the documents in the snapshot
    const vehicles = await Promise.all(
      vehicleSnapshot.docs.map(async (doc) => {
        const car = doc.data();

        if (car.status === "booked") {
          // Get a reference to the 'rentals' collection
          const rentalsRef = collection(db, "rentals");

          // Create a query against the collection
          const rentalQuery = query(rentalsRef, where("carId", "==", doc.id));

          // Execute the query
          const rentalSnapshot = await getDocs(rentalQuery);

          // Get the renter's name and append it to the car object
          rentalSnapshot.docs.forEach((rentalDoc) => {
            const rental = rentalDoc.data();
            car.rentee = rental.rentee;
          });
        }
        return car;
      })
    );

    return vehicles;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//function to get all specific vehicle information
export const getVehicleInfo = async (carId) => {
  try {
    const carDoc = doc(db, "cars", carId);
    const docSnap = await getDoc(carDoc);

    const vehicleDoc = docSnap.data();

    return vehicleDoc;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//update vehicle information
export const updateCarData = async (key, value, carId) => {
  let dateUpdated = new Date();
  dateUpdated = Timestamp.fromDate(dateUpdated);

  try {
    await updateDoc(doc(db, "cars", carId), {
      [key]: value,
      dateUpdated: dateUpdated,
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

//update vehicle information
export const updateCarImage = async (key, value, carId) => {
  let dateUpdated = new Date();
  dateUpdated = Timestamp.fromDate(dateUpdated);

  try {
    // Create a copy of data to avoid mutation
    const dataCopy = JSON.parse(JSON.stringify(value));
    const promises = [];

    // Loop through imageUrls and documents
    for (let image in value) {
      if (value.hasOwnProperty(image)) {
        // Get the image URL
        const imageUrl = dataCopy[image];

        // Check if the URL is a file URL
        if (imageUrl.startsWith("file://")) {
          // Create a promise for each image processing task
          const promise = resizeImage(imageUrl, 640)
            .then((resizedImageUrl) =>
              uploadImage(
                resizedImageUrl,
                key === "imageUrls" ? "cars" : "document"
              )
            )
            .then((downloadURL) => {
              // Update the data with the download URL
              dataCopy[image] = downloadURL;
            })
            .catch((error) => alert(error));

          // Add the promise to the array
          promises.push(promise);
        }
      }
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    await updateDoc(doc(db, "cars", carId), {
      [key]: dataCopy,
      dateUpdated: dateUpdated,
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

//function get all vehicles for search vehicle feature
export const getRegisteredVehicle = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    // Get a reference to the 'cars' collection
    const carsRef = collection(db, "cars");

    // Create a query against the collection
    const q = query(carsRef, where("userId", "==", userId));

    // Execute the query
    const vehicleSnapshot = await getDocs(q);

    let vehicles = [];

    vehicleSnapshot.docs.forEach((doc) => {
      const vehicle = doc.data();

      vehicles.push(vehicle);
    });

    return vehicles;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//function to delete vehicle
//
export const deleteAVehicle = async (carId) => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    // Get a reference to the 'cars','rentals','reviews','subscription' collection
    const carsRef = collection(db, "cars");
    const rentalRef = collection(db, "rentals");
    const reviewsRef = collection(db, "reviews");
    const subscriptionRef = collection(db, "subscription");

    // Create a query against the rentals collection
    let rentalQueryRef = query(
      rentalRef,
      where("carId", "==", carId),
      where("status", "==", "approved")
    );

    // Get all documents from rentals collection that satisfy the query
    const rentalQuerySnapshot = await getDocs(rentalQueryRef);

    // Check if car is currently rented
    let isRented = false;
    rentalQuerySnapshot.forEach((doc) => {
      if (doc.exists()) {
        isRented = true;
      }
    });

    if (!isRented) {
      // Create a query against the cars collection
      let carQueryRef = doc(carsRef, carId);

      // Delete the document
      const result = await deleteDoc(carQueryRef);

      // Create a query against the reviews collection
      let reviewsQueryRef = query(reviewsRef, where("carId", "==", carId));

      // Get all documents from reviews collection that satisfy the query
      const reviewsQuerySnapshot = await getDocs(reviewsQueryRef);

      // Loop through each document and delete it
      reviewsQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Create a query against the subscription collection
      let subscriptionQueryRef = query(
        subscriptionRef,
        where("carId", "==", carId)
      );

      // Get all documents from subscription collection that satisfy the query
      const subscriptionQuerySnapshot = await getDocs(subscriptionQueryRef);

      // Loop through each document and delete it
      subscriptionQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      return {
        message: "Deleted successfully!",
        error: false,
        status: 200,
      };
    } else {
      alert("Vehicle is currently rented and cannot be deleted!");

      return {
        message: "Car is currently rented and cannot be deleted.",
        error: true,
        status: 400,
      };
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};
