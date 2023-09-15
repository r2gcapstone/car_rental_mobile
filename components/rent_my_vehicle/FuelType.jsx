import React from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "../button/Dropdown";

const options = [
  {
    label: "Gasoline",
    value: "gasoline",
    caption:
      "It is a liquid fuel commonly used in internal combustion engines to power automobiles, motorcycles, and small machinery.",
  },
  {
    label: "Diesel",
    value: "diesel",
    caption:
      "Diesel fuel is another type of liquid fuel used in diesel engines, which are commonly found in trucks, buses, ships, and some cars.",
  },
  {
    label: "Biodiesel",
    value: "biodiesel",
    caption:
      "Biodiesel is a renewable and environmentally friendly alternative to conventional diesel fuel. It is derived from renewable sources such as vegetable oils, animal fats, or even recycled cooking oils.",
  },
];

const FuelType = ({ formData, setFormData }) => (
  <View style={styles.container}>
    <Dropdown
      placeholder="Select Type of Fuel"
      label="Fuel Type :"
      options={options}
      value={formData.fuelType}
      onChange={(selectedValue) =>
        setFormData({ ...formData, fuelType: selectedValue })
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
});

export default FuelType;
