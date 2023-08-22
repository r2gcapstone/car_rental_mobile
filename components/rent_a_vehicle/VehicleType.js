import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../constants/Colors";

const VehicleDropdown = () => {
  const options = [
    { label: "Default (Select All Option)", value: "default" },
    { label: "Compact Cars", value: "compact" },
    { label: "Mid-size Cars", value: "midSize" },
    { label: "Full-Size Cars", value: "fullSize" },
    { label: "Truck & Pickups", value: "truck" },
    { label: "SubCompact Cars", value: "subCompact" },
    { label: "Vans & Minivans", value: "vans" },
    { label: "SUV's", value: "suvs" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Type of Vehicle" value="" />
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

export default VehicleDropdown;
