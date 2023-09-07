import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "../button/Dropdown";

const options = [
  {
    label: "Manual Transmission",
    value: "manual",
    caption:
      "A manual transmission, also known as a stick shift, is a type of transmission that requires the driver to manually shift gears using a clutch pedal and a gear shift.",
  },
  {
    label: "Automatic Transmission",
    value: "automatic",
    caption:
      "An automatic transmission is a type of transmission that automatically shifts gears based on the speed and load of the vehicle.",
  },
  {
    label: "Continuously Variable Transmission",
    value: "cvt",
    caption:
      "An automatic transmission is a type of transmission that automatically shifts gears based on the speed and load of the vehicle.",
  },
  {
    label: "Semi-Automatic Transmission",
    value: "semiAuto",
    caption:
      "A semi-automatic transmission is a type of transmission that combines elements of manual and automatic transmissions.",
  },
  {
    label: "Dual Clutch Transmission",
    value: "dualClutch",
    caption:
      "A dual-clutch transmission is a type of transmission that uses two clutches to provide faster and smoother gear changes than a traditional manual transmission.",
  },
];

const YourComponent = ({ formData, setFormData }) => {
  return (
    <View style={styles.container}>
      <Dropdown
        placeholder="Select Type of Gear Shift"
        label="Gear Shift:"
        options={options}
        value={formData.gearType}
        onChange={(selectedValue) =>
          setFormData({ ...formData, gearType: selectedValue })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Your other styles here
});

export default YourComponent;
