import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

const LoadingAnimation = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue.slitedark} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoadingAnimation;
