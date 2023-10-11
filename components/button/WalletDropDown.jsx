import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const WalletDropDown = ({ wallet, options, handleOnChange }) => {
  return (
    <View style={styles.dropdown}>
      <Picker
        selectedValue={wallet}
        onValueChange={(value) => handleOnChange(value)}
        dropdownIconColor={"#fff"}
        style={{
          color: "#fff",
          height: 50,
          width: 135,
          marginBottom: 4,
        }}
      >
        <Picker.Item label="Choose" value=""></Picker.Item>
        {options.map(({ label, value }, index) => (
          <Picker.Item key={index} label={label} value={value}></Picker.Item>
        ))}
      </Picker>
    </View>
  );
};

export default WalletDropDown;

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 4,
    overflow: "hidden",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#526D82",
  },
});
