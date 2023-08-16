import { Image, StyleSheet, View } from "react-native";
import React from "react";

import Text from "components/ThemedText";

export default function Header() {
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
        <Image
          source={require("assets/images/logout.png")}
          style={styles.logoutIcon}
        />
      </View>
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
    height: 16,
    width: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    fontSize: 27,
  },
  logo: {
    height: 52,
    width: 43,
  },
});
