import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "constants/Colors";

import Text from "components/ThemedText";
import arrowIcon from "assets/icons/arrowBlack.png";

const Dropdown = ({
  label,
  options,
  optionStyle,
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
        <View
          style={[
            optionStyle
              ? optionStyle
              : { backgroundColor: colors.blue.slitedark },
            styles.optionsContainer,
          ]}
        >
          {options.map((option, index) => (
            <View
              style={[
                styles.option,
                index === options.length - 1 && styles.lastOption,
              ]}
              key={option.value}
            >
              <TouchableOpacity
                style={styles.optionContainer}
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
            </View>
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
    color: colors.textColor.dark2,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  optionsContainer: {
    top: 1,
    height: "auto",
    left: 0,
    right: 0,
    marginHorizontal: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white[1],
    width: "100%",
    alignItems: "center",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContainer: {
    width: "100%",
  },
  optionLabel: {
    color: "#fff",
    fontSize: 16,
  },
  optionCaption: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    color: colors.white[1],
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    opacity: 0.8,
  },
});

export default Dropdown;
