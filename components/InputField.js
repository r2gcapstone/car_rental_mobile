import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "constants/Colors";
import { TextInput } from "react-native-gesture-handler";

const InputField = ({
  type,
  onChangeText,
  label,
  keyboardType,
  placeholder,
}) => {
  const [error, setError] = useState("");
  const validateInput = (text) => {
    if (placeholder === "Optional") {
      setError("");
    } else if (type === "text" && text.length < 3) {
      setError("Text must be at least 3 characters.");
    } else if (type === "number" && !/^\d+$/.test(text)) {
      setError("Please enter a valid number.");
    } else {
      setError("");
    }
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label || "Label :"}</Text>
      <TextInput
        style={styles.textField}
        onChangeText={validateInput}
        keyboardType={keyboardType}
        onBlur={() => validateInput}
        placeholder={placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    gap: 8,
  },
  textField: {
    flex: 1,
    height: 40,
    width: "100%",
    backgroundColor: colors.white[1],
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 8,
    color: colors.textColor.dark,
    fontSize: 14,
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
