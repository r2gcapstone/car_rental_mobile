import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "../button/Dropdown";
import { colors } from "constants/Colors";

const options = [
  { label: "Fuel Type", value: "" },
  { label: "Gasoline", value: "gasoline" },
  { label: "Diesel", value: "diesel" },
  { label: "Biodiesel", value: "biodiesel" },
];

const FuelTypeDropdown = ({ formData, setFormData }) => (
  <View style={styles.container}>
    <Dropdown
      placeholder="Fuel Type"
      label="Fuel Type :"
      options={options}
      optionStyle={{
        backgroundColor: colors.blue.dark,
        textAlign: "center",
        position: "absolute",
        zIndex: 1,
        marginTop: 68,
      }}
      value={formData.fuelType}
      onChange={(selectedValue) =>
        setFormData({
          ...formData,
          fuelType: selectedValue,
        })
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FuelTypeDropdown;
