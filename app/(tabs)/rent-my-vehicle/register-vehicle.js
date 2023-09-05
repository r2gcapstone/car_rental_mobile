import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
//layout
import MainLayout from "layouts/MainLayout";
//components
import LoadingAnimation from "components/LoadingAnimation";
import Text from "components/ThemedText";
import VehicleType from "../../../components/rent_my_vehicle/VehicleType";
//constants
import { colors } from "constants/Colors";

export default function RegisterVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleType: "",
    gearType: "",
    fuelType: "",
    passengerCount: "",
    luggageCount: "",
    plateNumber: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Vehicle Information</Text>
        </View>
        <Text style={styles.caption}>
          Please fill up the important information to proceed.
        </Text>

        <View style={styles.formContainer}>
          <VehicleType formData={formData} setFormData={setFormData} />
        </View>
      </ScrollView>
      {/* <LoadingAnimation isVisible={isLoading} /> */}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    fontSize: 14,
    marginTop: 10,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
