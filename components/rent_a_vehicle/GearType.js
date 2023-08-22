import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../constants/Colors";

const GearShiftDropdown = () => {
  const options = [
    { label: "Manual Transmission", value: "manual" },
    { label: "Automatic Transmission", value: "automatic" },
    { label: "Continuously Variable Transmission", value: "cvt" },
    { label: "Semi-Automatic Transmission", value: "semiAuto" },
    { label: "Dual Clutch Transmission", value: "dualClutch" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Gear Shift Type" value="" />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white[1],
    borderRadius: 5,
  },
  picker: {
    width: "100%",
    borderRadius: 100,
    color: colors.textColor.dark2,
  },
});

export default GearShiftDropdown;
