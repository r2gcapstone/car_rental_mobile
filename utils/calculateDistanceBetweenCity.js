import * as Location from "expo-location";
import { getDistance } from "geolib";

export const getDistanceBetweenCities = async (city1, city2) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    // Get latitude and longitude of the first city
    const geocodedLocation1 = await Location.geocodeAsync(city1);
    if (!geocodedLocation1 || geocodedLocation1.length === 0) {
      console.log(`Geocoding failed for ${city1}`);
      return;
    }
    const { latitude: lat1, longitude: lon1 } = geocodedLocation1[0];

    // Get latitude and longitude of the second city
    const geocodedLocation2 = await Location.geocodeAsync(city2);
    if (!geocodedLocation2 || geocodedLocation2.length === 0) {
      console.log(`Geocoding failed for ${city2}`);
      return;
    }
    const { latitude: lat2, longitude: lon2 } = geocodedLocation2[0];

    // Calculate the distance in kilometers
    const distance = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );

    // console.log(distance / 1000);
    return distance / 1000; // Convert to kilometers
  } catch (error) {
    console.error(error);
  }
};
