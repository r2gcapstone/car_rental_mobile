import { StyleSheet, Text, View } from "react-native";
import React from "react";
//layout
import Map from "components/rent_my_vehicle/Map";
import { useRoute } from "@react-navigation/native";

const Tracker = () => {
  const route = useRoute();
  //vehicleDetails data
  const data = JSON.parse(route.params?.data);

  const { carId } = data;

  return (
    <View style={styles.container}>
      <Map carId={carId} />
    </View>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
