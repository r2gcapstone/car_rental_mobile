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
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";
import formatDate from "utils/formatDate";

const auth = getAuth(app);
//POST
//register car function
export const RegisterCar = async ({ data }) => {
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
            console.log(downloadURL);
            // Update the data with the download URL
            dataCopy.imageUrls[key] = downloadURL;
          })
          .catch((error) =>
            console.error(`Error processing image ${key}: ${error}`)
          );

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
            console.log(downloadURL);
            // Update the data with the download URL
            dataCopy.document[key] = downloadURL;
          })
          .catch((error) =>
            console.error(`Error processing image ${key}: ${error}`)
          );

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
    await updateDoc(docRef, { carId });

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

        // console.log(car);
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

    if (docSnap.exists()) {
      console.log("exist");
    } else {
      console.log("No such document!");
    }

    const vehicleDoc = docSnap.data();

    return vehicleDoc;
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

//update vehicle information
export const updateCarData = async (key, value, carId) => {
  console.log("carId", carId);
  const date = new Date();
  const formatedDate = formatDate(date);
  try {
    console.log(key, value, carId);
    await updateDoc(doc(db, "cars", carId), {
      [key]: value,
      dateUpdated: formatedDate,
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
