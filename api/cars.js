import { db, app } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
//utils
import resizeImage from "../utils/resizeImage";
import uploadImage from "../utils/uploadImage";

const auth = getAuth(app);

// Function to register a car
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

    await addDoc(carsCollection, carData);

    return {
      message: "Vehicle successfully registered!",
      error: false,
      status: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, status: error.code };
  }
};

// // Function to rent a car
// export const RentCar = async ({ carId }) => {
//   try {
// const user = auth.currentUser;
// const userId = user.uid;
//     const rentalsCollection = collection(db, "rentals");
//     const rentalData = { userId, carId };
//     const result = await addDoc(rentalsCollection, rentalData);

// return {
//   message: "Account successfully created!",
//   error: false,
//   status: 201,
// };
//   } catch (error) {
//     console.error("Error renting car:", error);
//     return { error: true, message: error.message, status: error.code };
//   }
// };
