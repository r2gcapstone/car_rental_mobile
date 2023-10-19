import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { logout } from "api/auth";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";

//layout
import MainLayout from "layouts/MainLayout";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
//constants
import { useRoute } from "@react-navigation/native";

export default function SuccessScreen() {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const route = useRoute();
  //prev data
  const data = route?.params;
  const { caption, mode } = data;
  const handleNav = async (mode) => {
    if (mode == "updatePass" || mode == "updateEmail") {
      try {
        const response = await logout();
        if (!response.error) {
          showLoading();
          router.replace("/login");
          hideLoading();
        }
      } catch (error) {
        console.error(error);
        hideLoading();
      }
    } else {
      router.replace("(tabs)/profile");
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.successText}>{caption}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => handleNav(mode)}
          >
            <Text style={styles.proceedBtnText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingComponent />
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
