import {
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import Header from "components/home/Header";
import RentDateAndTime from "components/rent_a_vehicle/RentDateAndTime";

import { colors } from "constants/Colors";

export default function RentAVehicle() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeView}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.row}>
            <RentDateAndTime />
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#fff" }}
            ></View>
            <Text style={styles.filterText}>Filter (Optional)</Text>
            <View style={styles.rowData}></View>
            <View style={styles.rowData}></View>
            <View style={styles.rowData}></View>
            <View style={styles.rowData}></View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#fff" }}
            ></View>
            <Text>
              Note : The location of your device will be used to find vehicles
              near you. (Required)
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <View style={styles.col}>
              <Image
                style={styles.icon}
                source={require("assets/icons/clipboard.png")}
              />
              <Text style={styles.btnText}>My Application for Renting</Text>
            </View>
            <TouchableOpacity style={styles.viewContainer}>
              <Text>View</Text>
              <Image
                style={styles.arrowIcon}
                source={require("assets/icons/arrowWhite.png")}
              ></Image>
            </TouchableOpacity>
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
    flex: 1,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "column",
    gap: 23,
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
  rowData: {
    flex: 1,
    backgroundColor: "#fff",
    height: 10,
    width: "100%",
  },
  icon: {
    width: 32,
    height: 30,
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
  col: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.blue.slitedark,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.dark,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  filterText: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
  },
});
