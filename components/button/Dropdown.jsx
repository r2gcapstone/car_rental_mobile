import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "constants/Colors";

import Text from "components/ThemedText";
import arrowIcon from "assets/icons/arrowBlack.png";

const Dropdown = ({
  label,
  options,
  value,
  placeholder,
  onChange,
  labelStyle,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectOption = (selectedValue) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {!options.value ? <Text style={styles.label}>{label}</Text> : ""}

      <TouchableOpacity style={styles.pickerContainer} onPress={toggleDropdown}>
        <Text style={styles.selectedOption}>
          {options.find((option) => option.value === value)?.label ||
            placeholder}
        </Text>
        <Image style={styles.icon} source={arrowIcon}></Image>
      </TouchableOpacity>
      {open && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                index === options.length - 1 && styles.lastOption,
              ]}
              onPress={() => selectOption(option.value)}
            >
              <Text style={[styles.optionLabel, labelStyle]}>
                {option.label}
              </Text>
              {option.caption ? (
                <Text style={styles.optionCaption}>{option.caption}</Text>
              ) : (
                ""
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white[1],
    borderRadius: 10,
    height: 40,
    borderColor: colors.borderColor,
  },
  selectedOption: {
    color: colors.textColor.dark,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  optionsContainer: {
    top: 1,
    height: "auto",
    left: 0,
    right: 0,
    backgroundColor: colors.blue.slitedark,
    marginHorizontal: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionLabel: {
    color: "#fff",
    fontSize: 16,
  },
  optionCaption: {
    color: "#fff",
    fontSize: 10,
    marginTop: 4,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Dropdown;
