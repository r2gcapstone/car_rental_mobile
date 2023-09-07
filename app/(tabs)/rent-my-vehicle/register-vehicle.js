import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
//layout
import MainLayout from "layouts/MainLayout";
//components
import Text from "components/ThemedText";
import VehicleType from "components/rent_my_vehicle/VehicleType";
import GearShiftDropdown from "components/rent_my_vehicle/GearType";
import FuelType from "components/rent_my_vehicle/FuelType";
import InputField from "components/InputField";
import ProceedButton from "components/button/proceedButton";

export default function RegisterVehicle() {
  const [formData, setFormData] = useState({
    vehicleName: "",
    model: "",
    vehicleType: "",
    gearType: "",
    fuelType: "",
    passengerCount: "",
    luggageCount: "",
    plateNumber: "",
  });

  const handleOnhangeText = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const isFormDataEmpty = (formData) => {
    for (const key in formData) {
      if (formData[key] === "") {
        return true;
      }
    }
    return false;
  };

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
          <InputField
            label={"Vehicle Name :"}
            keyboardType="default"
            type="text"
            name="vehicleName"
            onChangeText={(value) => handleOnhangeText("vehicleName", value)}
            required
          />
          <InputField
            label={"Model :"}
            keyboardType="default"
            type="text"
            name="model"
            onChangeText={(value) => handleOnhangeText("model", value)}
            required
          />
          <VehicleType formData={formData} setFormData={setFormData} />
          <GearShiftDropdown formData={formData} setFormData={setFormData} />
          <InputField
            label={"Number of Passengers :"}
            keyboardType="number-pad"
            type="number"
            name="passengerCount"
            onChangeText={(value) => handleOnhangeText("passengerCount", value)}
            required
          />
          <FuelType formData={formData} setFormData={setFormData} />
          <InputField
            label={"Number of Luggage :"}
            keyboardType="number-pad"
            type="number"
            name="luggageCount"
            onChangeText={(value) => handleOnhangeText("luggageCount", value)}
            required
          />
          <InputField
            label={"Plate Number :"}
            type="text"
            name="plateNumber"
            onChangeText={(value) => handleOnhangeText("plateNumber", value)}
            required
          />
        </View>
        <ProceedButton
          disable={isFormDataEmpty(formData)}
          contProps={{ marginTop: 25, marginBottom: 40 }}
          btnProps={{ fontSize: 18 }}
          btnText={"Proceed"}
          link={"rent-my-vehicle/register-vehicle-jkhcjsa"}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -21,
    paddingTop: 10,
    width: "100%",
    height: "100%",
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
  formContainer: {
    marginTop: 25,
    gap: 14,
    flex: 1,
    height: "auto",
    overflow: "scroll",
    justifyContent: "space-evenly",
  },
});
