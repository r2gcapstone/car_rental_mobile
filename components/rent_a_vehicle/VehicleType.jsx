import React from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "components/button/Dropdown";
import { colors } from "constants/Colors";

const options = [
  { label: "Select Type of Vehicle", value: "" },
  { label: "Compact Cars", value: "compact" },
  { label: "Mid-size Cars", value: "midSize" },
  { label: "Full-Size Cars", value: "fullSize" },
  { label: "Truck & Pickups", value: "truck" },
  { label: "SubCompact Cars", value: "subCompact" },
  { label: "Vans & Minivans", value: "vans" },
  { label: "SUV's", value: "suvs" },
];

const VehicleDropdown = ({ formData, setFormData }) => (
  <View style={styles.container}>
    <Dropdown
      placeholder="Select Type of Vehicle"
      label="Vehicle Class :"
      options={options}
      optionStyle={{ backgroundColor: colors.blue.dark, textAlign: "center" }}
      value={formData.vehicleType}
      onChange={(selectedValue) =>
        setFormData({ ...formData, vehicleType: selectedValue })
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VehicleDropdown;
