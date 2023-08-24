import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../constants/Colors";

import Text from "components/ThemedText";

const VehicleDropdown = ({ vehicleType, setVehicleType }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type of Vehicle :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={vehicleType}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  pickerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white[1],
    borderRadius: 5,
    height: 35,
  },
  picker: {
    width: "100%",
    borderRadius: 100,
    color: colors.textColor.dark2,
  },
});

export default VehicleDropdown;
