import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import formatTimeStamp from "utils/formatTimeStamp";
import { updateLocation } from "api/location";

const LocationContext = createContext();
export const useLocationContext = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [docIds, setDocIds] = useState([]);
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
        { accuracy: Location.Accuracy.High, timeInterval: 60000 }, // 1 minute in milliseconds
        (newLocation) => {
          setLocation(newLocation);
          if (docIds) {
            let newLoc = {
              ...newLocation,
              timestamp: formatTimeStamp(newLocation.timestamp),
              status: "on",
            };
            docIds.forEach((docId) => {
              updateLocation(newLoc, docId);
            });
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
      value={{
        location,
        errorMsg,
        setDocIds,
        setIsTracking,
        docIds,
        isTracking,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
