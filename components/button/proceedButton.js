import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

//constants
import { colors } from "constants/Colors";

const ProceedButton = ({ contProps, btnProps, btnText, link, disable }) => {
  const handleOnPress = () => {
    router.push(link);
  };

  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.proceedBtn, contProps, disable && { opacity: 0.5 }]}
      onPress={handleOnPress}
    >
      <Text style={[styles.buttonText, btnProps]}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ProceedButton;

const styles = StyleSheet.create({
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.slitedark,
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
