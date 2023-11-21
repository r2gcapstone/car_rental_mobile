import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "components/KeyboardAvoidingView";
import { SafeAreaView } from "react-native";

// Constants
import { colors } from "constants/Colors";

const MainLayout = ({ children }) => {
  return (
    <KeyboardAvoidingContainer>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.blue.dark}
          translucent={true}
          barStyle={"light-content"}
        />
        {/* {children} */}
        <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>
      </View>
    </KeyboardAvoidingContainer>
  );
};
export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  safeView: {
    flex: 1,
    width: "100%",
    paddingTop: StatusBar.currentHeight,
  },
});
