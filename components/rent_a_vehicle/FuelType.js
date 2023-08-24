import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "constants/Colors";

import Text from "components/ThemedText";

const FuelTypeDropdown = ({ fuelType, setFuelType }) => {
  const options = [
    { label: "Default (Select All Options)", value: "default" },
    { label: "Gasoline", value: "gasoline" },
    { label: "Diesel", value: "diesel" },
    { label: "Biodiesel", value: "biodiesel" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Fuel Type :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fuelType}
          onValueChange={(itemValue) => setFuelType(itemValue)}
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

export default FuelTypeDropdown;
