import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { loc } from "../../assets/icons/index";
import { Image } from "react-native";

const initialLoc = {
  latitude: 10.0643,
  longitude: 123.0882,
  latitudeDelta: 3,
  longitudeDelta: 1,
};

export default function Map() {
  const [location, setLocation] = useState(initialLoc);
  const [coordinate, setCoordnate] = useState({
    latitude: 10.6522,
    longitude: 122.9377,
  });

  const handleMarkerPress = () => {
    setLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  return (
    <View style={styles.container}>
      <MapView region={location} style={styles.map}>
        {coordinate && (
          <Marker
            title="Address"
            coordinate={coordinate}
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
