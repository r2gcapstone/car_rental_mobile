import {
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";

// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import Header from "components/home/Header";
import LoadingAnimation from "components/LoadingAnimation";

import { colors } from "constants/Colors";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeView}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.row}>
            <Image
              source={require("assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Welcome to R2G</Text>
            <Text style={styles.text}>
              Car renters and owners! Our mobile application offers a seamless
              and secure way for individuals to rent and advertise their
              vehicles.{" "}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.imgContainer}>
              <ImageBackground
                source={require("assets/images/homeImg1.png")}
                style={styles.Img1}
              />
            </View>
            <Text style={styles.titleText}>Track Your vehicle</Text>
            <Text style={styles.text}>
              Car renters and owners! Our mobile application offers a seamless
              and secure way for individuals to rent and advertise their
              vehicles.{" "}
            </Text>
          </View>
          <View style={styles.row3}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Vehicle Preference</Text>
              <Text style={styles.text}>
                With R2G, car renters can easily find a wide range of vehicles
                that match their preference and budget with the use of R2G
                filter feature.
              </Text>
            </View>
            <View style={styles.img2Container}>
              <ImageBackground
                source={require("assets/images/homeImg2.png")}
                style={styles.Img2}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
  },
  scroll: {
    flex: 1,
    height: "100%",
  },
  row: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "column",
    gap: 23,
    padding: 17,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  row3: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    gap: 23,
    paddingHorizontal: 17,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  // text: {
  //   backgroundColor: "#000",
  // },
  logoText: {
    fontSize: 25,
    marginTop: 5,
  },
  logo: {
    height: 52,
    width: 43,
    position: "absolute",
    left: 18,
    top: 10,
  },
  imgContainer: {
    width: "115%",
    height: 104,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    top: -18,
    marginBottom: -23,
  },

  Img1: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
  },
  img2Container: {
    width: "35%",
    height: 158,
    overflow: "hidden",
  },
  Img2: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",

    alignSelf: "flex-start",
  },
  textContainer: {
    width: "65%",
    gap: 23,
    backgroundColor: colors.blue.slitedark,
  },
});
