import { StyleSheet, Image, ScrollView } from "react-native";
import React from "react";

//layout
import MainLayout from "layouts/MainLayout";
// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import Header from "components/home/Header";

import { colors } from "constants/Colors";

export default function Homepage() {
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.row}>
          <Image
            source={require("assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Welcome to R2G</Text>
          <Text style={styles.text}>
            Car renters and owners! Our mobile application offers a seamless and
            secure way for individuals to rent and advertise their vehicles.{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require("assets/images/homeImg1.png")}
            style={styles.Img1}
          />

          <Text style={styles.titleText}>Track Your vehicle</Text>
          <Text style={styles.text}>
            Car renters and owners! Our mobile application offers a seamless and
            secure way for individuals to rent and advertise their vehicles.{" "}
          </Text>
        </View>
        <View style={styles.row3}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Vehicle Preference</Text>
            <Text style={styles.text}>
              With R2G, car renters can easily find a wide range of vehicles
              that match their preference and budget with the use of R2G filter
              feature.
            </Text>
          </View>

          <Image
            source={require("assets/images/homeImg2.png")}
            style={styles.Img2}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  scroll: {
    flex: 1,
    width: "100%",
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
    padding: 17,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
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
  Img1: {
    flex: 1,
    height: 104,
    width: "115%",
    top: -30,
    marginBottom: -30,
    resizeMode: "stretch",
  },
  Img2: {
    height: "145%",
    width: "35%",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  textContainer: {
    paddingTop: -20,
    width: "65%",
    gap: 23,
    alignItems: "center",
    backgroundColor: colors.blue.slitedark,
  },
});
