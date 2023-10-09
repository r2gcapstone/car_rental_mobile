import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "constants/Colors";
import { TextInput } from "react-native-gesture-handler";

const InputField = ({
  type,
  onChangeText,
  label,
  labelTarget,
  keyboardType,
  placeholder,
  value,
  textError,
  isTextError,
  isIcon,
  textProp,
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
      <Text style={styles.label}>
        {label || "Label :"}
        <Text style={styles.labelTarget}>{labelTarget}</Text>
      </Text>
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
          style={[styles.input, textProp]}
          onChangeText={validateInput}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
        />
      </View>
      {isTextError && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    gap: 8,
  },
  textFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.white[1],
    gap: 10,
  },
  input: {
    width: "100%",
    color: colors.textColor.dark2,
    fontSize: 16,
    overflow: "scroll",
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  labelTarget: {
    fontWeight: "bold",
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
