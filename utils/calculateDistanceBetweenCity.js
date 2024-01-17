import * as Location from "expo-location";

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
    const geocodedLocation2 = await Location.geocodeAsync(
      city2 + ", Philippines"
    );
    if (!geocodedLocation2 || geocodedLocation2.length === 0) {
      console.log(`Geocoding failed for ${city2}`);
      return;
    }
    const { latitude: lat2, longitude: lon2 } = geocodedLocation2[0];

    // Define the API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=AIzaSyBsjaYpcqQsuXso2ZmNYIWvhm7Pnr9h-tU`;

    // Fetch the data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract the distance from the data
    let distance = data.rows[0].elements[0].distance.text;
    let distanceInMiles = parseFloat(distance);
    let distanceInKm = distanceInMiles * 1.60934;

    let numWithTwoDecimals = distanceInKm.toFixed(3);

    return numWithTwoDecimals;
  } catch (error) {
    console.error(error);
  }
};
