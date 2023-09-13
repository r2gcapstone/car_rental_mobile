import React from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Text from "components/ThemedText";
import { colors } from "constants/Colors";

const LandingPage = () => {
  return (
    <ImageBackground
      source={require("assets/images/bg.png")}
      style={styles.backgroundImage}
    >
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.slogan}>Find a rental vehicle in easy steps</Text>
        {/* <Link href="/login" asChild> */}
        {/* <Link href="(tabs)/rent-my-vehicle/price-rate" asChild> */}
        <Link href="(tabs)/rent-my-vehicle/register-vehicle" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Here</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.footer}>
        <Icon name="copyright" size={16} color="#FFFFFF" />
        <Text style={styles.footerText}> Rent2Go Corporation 2023</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    height: "auto",
    marginBottom: 20,
  },
  logo: {
    width: 89,
    height: 107,
    marginBottom: 10,
  },
  slogan: {
    fontSize: 42,
    color: "#FFFFFF",
    marginBottom: 100,
    shadowColor: "#000",
    textShadowColor: "#000",
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: colors.blue.slitedark,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontSize: 24,
    fontWeight: 400,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    opacity: 0.5,
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default LandingPage;
