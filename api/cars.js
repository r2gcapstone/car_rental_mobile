import { db, app } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const auth = getAuth(app);

// Function to register a car
export const RegisterCar = async ({ data }) => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const carsCollection = collection(db, "cars");
    const carData = { ...data, userId, rented: false };

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
