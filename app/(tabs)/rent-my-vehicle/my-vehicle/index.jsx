import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import VehicleList from "components/rent_my_vehicle/vehicleList";

//layout
import MainLayout from "layouts/MainLayout";

const MyVehicle = () => {
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <VehicleList />
      </ScrollView>
    </MainLayout>
  );
};

export default MyVehicle;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
});
