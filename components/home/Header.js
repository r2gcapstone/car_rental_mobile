import { Image, StyleSheet, View } from "react-native";
import React from "react";

import Text from "components/ThemedText";
import { logout } from "api/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useState } from "react";
import { colors } from "../../constants/Colors";
import LoadingAnimation from "components/LoadingAnimation";

export default function Header() {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await logout();
      if (response.status === 200) {
        setIsLoading(false);
        router.back("/index");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.logoText}>R2G</Text>
      </View>
      <View style={styles.logoutContainer}>
        <Image
          source={require("assets/images/bell.png")}
          style={styles.bellIcon}
        />
        <TouchableOpacity onPress={() => setModal((prevValue) => !prevValue)}>
          <Image
            source={require("assets/images/logout.png")}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </View>
      {modal ? (
        <View style={styles.logoutModal}>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}
      <LoadingAnimation isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 32,
    paddingTop: 20,
  },
  bellIcon: {
    height: 28,
    width: 28,
  },
  logoutIcon: {
    height: 20,
    width: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  logoText: {
    fontSize: 27,
  },
  logo: {
    height: 52,
    width: 43,
  },
  logoutModal: {
    padding: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: colors.blue.slitedark,
    borderRadius: 5,
    position: "absolute",
    top: 65,
    right: 0,
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOffset: 0.8,
    shadowOpacity: 0.2,
  },
});
