import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

//layout
import MainLayout from "layouts/MainLayout";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
//constants
import { colors } from "constants/Colors";

export default function SuccessModal() {
  const handleNav = () => {
    router.push("/login");
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.successText}>
          You have successfully created an account.
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleNav}>
            <Text style={styles.proceedBtnText}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  logo: { width: 182, height: 220 },
  proceedButton: {
    backgroundColor: colors.blue.slitedark,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  btnContainer: {
    width: "80%",
  },
  proceedBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
  successText: {
    fontSize: 20,
    textAlign: "center",
    width: "80%",
  },
});
