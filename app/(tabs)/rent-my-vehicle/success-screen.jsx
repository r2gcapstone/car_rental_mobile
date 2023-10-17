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

export default function SuccessScreen() {
  const handleNav = () => {
    router.replace("/rent-my-vehicle");
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.successText}>
          You successfully registered your vehicle
        </Text>
        <Text style={styles.caption}>
          To be able to showcase your vehicle to other users in the application,
          you have buy a <Text style={styles.boldCaption}>Subscription</Text>{" "}
          first.
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleNav}>
            <Text style={styles.proceedBtnText}>Okay</Text>
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
    width: "100%",
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
    alignSelf: "center",
    width: "80%",
  },
  proceedBtnText: {
    fontSize: 19,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
  successText: {
    fontSize: 25,
    textAlign: "center",
  },
  caption: {
    textAlign: "center",
  },
  boldCaption: {
    fontWeight: "bold",
  },
});
