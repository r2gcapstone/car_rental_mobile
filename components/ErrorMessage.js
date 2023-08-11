import { StyleSheet, Text } from "react-native";
import React from "react";

export default function ErrorMessage({ error }) {
  return error ? <Text style={styles.errorText}>{error}</Text> : null;
}

const styles = StyleSheet.create({
  errorText: {
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 5,
  },
});
