import React, { useState } from "react";
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import { colors } from "../constants/Colors";

const LoadingAnimation = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <StatusBar hidden={true} />
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

// Custom Hook
export const useLoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const LoadingComponent = () => <LoadingAnimation isVisible={isLoading} />;

  return { showLoading, hideLoading, LoadingComponent };
};
