import { StyleSheet, StatusBar, ScrollView, View } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "components/KeyboardAvoidingView";
import { SafeAreaView } from "react-native";
// import View from "components/ThemedView";

// Constants
import { colors } from "constants/Colors";

export default function MainLayout({ children }) {
  return (
    <KeyboardAvoidingContainer>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.blue.dark}
          translucent={true}
          barStyle={"light-content"}
        />
        <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>
      </View>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  safeView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
});