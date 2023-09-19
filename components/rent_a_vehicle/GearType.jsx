import React from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "../button/Dropdown";
import { colors } from "constants/Colors";

const options = [
  { label: "Select Type of Gear Shift", value: "" },
  { label: "Manual Transmission", value: "manual" },
  { label: "Automatic Transmission", value: "automatic" },
  { label: "Continuously Variable Transmission", value: "cvt" },
  { label: "Semi-Automatic Transmission", value: "semiAuto" },
  { label: "Dual Clutch Transmission", value: "dualClutch" },
];

const GearShiftDropdown = ({ formData, setFormData }) => (
  <View style={styles.container}>
    <Dropdown
      placeholder="Select Gear Type"
      label="Gear Shift :"
      options={options}
      optionStyle={{
        backgroundColor: colors.blue.dark,
        textAlign: "center",
      }}
      value={formData.gearType}
      onChange={(selectedValue) =>
        setFormData({ ...formData, gearType: selectedValue })
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GearShiftDropdown;
