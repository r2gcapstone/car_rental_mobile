import React from "react";
import { View, StyleSheet } from "react-native";
import Dropdown from "../button/Dropdown";

const options = [
  {
    label: "SubCompact Cars",
    value: "subCompact",
    caption:
      "These are the smallest cars on the market , with a length typically under 4 meters (13 feet). They often have just enough room for two to four passengers and they are designed for city driving and tight parking spaces.",
  },
  {
    label: "Compact Cars",
    value: "compact",
    caption:
      "These are slightly larger than subcompact vehicle , with a length typically between 4 and 4.5 meters (13 to 15 feet). They have more room for passenger and cargo than subcompact vehicle, but they are still designed to be efficient and practical.",
  },
  {
    label: "Mid-size Cars",
    value: "midSize",
    caption:
      "These are larger than compact vehicle, with a length typically between 4.5 and 5 meters (15 to 16.5 feet). They offer more interior space, comfort, and features than compact vehicle, they have more powerful engines and sportier handling. ",
  },
  {
    label: "Full-Size Cars",
    value: "fullSize",
    caption:
      "These are the largest on the market, with a length typically over 5 meters (16.5 feet). They offer the most interior space, comfort, and luxury features and they may have very powerful engines and advanced technology.",
  },
  {
    label: "SUV ( Sport Utility Vehicles )",
    value: "suvs",
    caption:
      "There are typically larger than cars and offer more ground clearance, higher driving position, and more interior space. They can range from compact crossover to full-size SUVs.",
  },
  {
    label: "Truck & Pickups",
    value: "truck",
    caption:
      "These are vehicles designed for heavy-duty tasks like hauling cargo and towing, with open beds in the back for carrying cargo.",
  },
  {
    label: "Vans & Minivans",
    value: "vans",
    caption:
      "These are vehicles designed for carrying passengers or cargo, with flexible interior layouts and typically sliding doors.",
  },
];

const VehicleDropdown = ({ formData, setFormData }) => (
  <View style={styles.container}>
    <Dropdown
      placeholder="Select Type of Vehicle"
      label="Vehicle Class :"
      options={options}
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
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
});

export default VehicleDropdown;
