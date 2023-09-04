import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const KeyboardAvoidingContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset as needed
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingContainer;
