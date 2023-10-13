import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { loc } from "assets/icons/index";
import { Image } from "react-native";
import { getMyRentalLoc } from "api/rental";

const initialLoc = {
  latitude: 10.5643,
  longitude: 123.0882,
  latitudeDelta: 3,
  longitudeDelta: 1,
};

export default function Map({ carId }) {
  const [location, setLocation] = useState(initialLoc);
  const [isTracking, setIsTracking] = useState(null);

  const handleMarkerPress = () => {
    const { latitude, longitude } = location;
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const fetchVehicleLocation = async (carId) => {
    try {
      const result = await getMyRentalLoc(carId);
      if (!result.error) {
        const { latitude, longitude } = result.location.coords;
        setIsTracking(result.location.status);
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    } catch (error) {
      // Handle errors here
    }
  };

  useEffect(() => {
    fetchVehicleLocation(carId);
  }, []);

  return (
    <View style={styles.container}>
      <MapView region={location} style={styles.map}>
        {isTracking == "on" && location && (
          <Marker
            title="Address"
            coordinate={location}
            onPress={handleMarkerPress}
          >
            <Image
              style={{
                height: 50,
                width: 30,
              }}
              source={loc}
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
