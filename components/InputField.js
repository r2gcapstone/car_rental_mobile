import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "constants/Colors";
import { TextInput } from "react-native-gesture-handler";

const InputField = ({
  type,
  onChangeText,
  label,
  keyboardType,
  placeholder,
  textError,
  isIcon,
}) => {
  const [error, setError] = useState("");
  const validateInput = (text) => {
    if (placeholder === "Optional") {
      setError("");
    } else if (type === "text" && text.length < 3) {
      setError(textError || "Text must be at least 3 characters.");
    } else if (type === "number" && !/^\d+$/.test(text)) {
      setError(textError || "Please enter a valid number.");
    } else {
      setError("");
    }
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label || "Label :"}</Text>
      <View style={styles.textFieldContainer}>
        {isIcon && (
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../assets/icons/Peso.png")}
            ></Image>
          </View>
        )}

        <TextInput
          style={styles.input}
          onChangeText={validateInput}
          keyboardType={keyboardType}
          onBlur={() => validateInput}
          placeholder={placeholder}
        />
      </View>
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
  textFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.white[1],
    gap: 10,
  },
  input: {
    width: "100%",
    color: colors.textColor.dark,
    fontSize: 16,
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  iconContainer: {
    padding: 4,
    paddingRight: 15,
    height: "100%",
    borderRightWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 17,
    width: 15,
  },
});
