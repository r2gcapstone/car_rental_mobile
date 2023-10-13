// LocationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import formatTimeStamp from "utils/formatTimeStamp";
import { updateRentalData } from "api/rental";

const LocationContext = createContext();
export const useLocationContext = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [docId, setDocId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    let subscriber;

    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      subscriber = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 600000 }, // 10 minutes in milliseconds
        (newLocation) => {
          console.log(formatTimeStamp(newLocation.timestamp));
          setLocation(newLocation);
          // Add logic here to pass the location to Firebase or any other service
          if (docId) {
            let newLoc = {
              ...newLocation,
              timestamp: formatTimeStamp(newLocation.timestamp),
            };
            updateRentalData(newLoc, docId);
          }
        }
      );
    };

    if (isTracking) {
      startLocationTracking();
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [isTracking]);

  return (
    <LocationContext.Provider
      value={{ location, errorMsg, setDocId, setIsTracking, isTracking }}
    >
      {children}
    </LocationContext.Provider>
  );
};
