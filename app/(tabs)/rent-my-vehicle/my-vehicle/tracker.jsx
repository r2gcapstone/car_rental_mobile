import { StyleSheet, Text, View } from "react-native";
import React from "react";
//layout
import Map from "components/rent_my_vehicle/Map";

const Tracker = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
