import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

//layout
import MainLayout from "layouts/MainLayout";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
//constants
import { useRoute } from "@react-navigation/native";

export default function SuccessScreen() {
  const route = useRoute();
  //prev data
  const choice = route.params?.choice;
  const handleNav = () => {
    router.replace("rent-my-vehicle/renting-application");
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.successText}>
          You have successfully {choice}d this applicant for renting
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
    width: "90%",
    gap: 20,
  },
  logo: { width: 182, height: 220 },
  proceedButton: {
    backgroundColor: "#fff",
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
    width: "40%",
  },
  proceedBtnText: {
    fontSize: 19,
    paddingHorizontal: 10,
    color: "#000",
  },
  successText: {
    fontSize: 20,
    textAlign: "center",
  },
  caption: {
    textAlign: "center",
  },
  boldCaption: {
    fontWeight: "bold",
  },
});
