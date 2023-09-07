import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
//layout
import MainLayout from "layouts/MainLayout";
//components
import Header from "components/home/Header";
import LoadingAnimation from "components/LoadingAnimation";
import Text from "components/ThemedText";
import ProceedButton from "components/button/proceedButton";
//constants
import { colors } from "constants/Colors";
//icon
import users from "assets/icons/users.png";
import myCar from "assets/icons/myCar.png";
import subscription from "assets/icons/subScription.png";
import arrow from "assets/icons/arrow.png";
//image
import image1 from "assets/images/image1.png";
import { Link } from "expo-router";

const options = [
  { label: "Application for Renting", icon: users },
  { label: "My Vehicle", icon: myCar },
  { label: "Subscription", icon: subscription },
];

export default function RentMyVehicle() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.row1}>
          <Text style={styles.header}>
            Let other people rent out your vehicle
          </Text>
          <Image style={styles.image} source={image1}></Image>
          <Text style={styles.caption}>
            In R2G, you have an option to use our platform to advertise your own
            vehicle to be rented by other people with your preferable price
          </Text>
          <ProceedButton
            contProps={{ backgroundColor: colors.blue.dark }}
            btnText={"Register Vehicle"}
            link={"rent-my-vehicle/register-vehicle"}
          />
        </View>
        {options.map((option, index) => (
          <View key={index} style={styles.row2}>
            <View style={styles.col}>
              <Image style={styles.icon} source={option.icon} />
              <Text style={styles.btnText}>{option.label}</Text>
            </View>
            <TouchableOpacity style={styles.viewContainer}>
              <Text>View</Text>
              <Image style={styles.arrowIcon} source={arrow}></Image>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <LoadingAnimation isVisible={isLoading} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  row1: {
    flex: 1,
    marginBottom: 15,
    flexDirection: "column",
    gap: 10,
    padding: 17,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  row2: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 23,
    padding: 17,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
    flexDirection: "row",
  },
  col: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.blue.slitedark,
  },
  icon: {
    width: 25,
    height: 25,
  },
  arrowIcon: {
    width: 17,
    height: 17,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    fontSize: 21,
    paddingBottom: 11,
    fontWeight: "bold",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: 165,
    borderRadius: 8,
  },
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.dark,
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
