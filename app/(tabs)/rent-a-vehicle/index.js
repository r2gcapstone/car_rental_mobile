import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

// Import the useNavigation hook
import { useNavigation } from "@react-navigation/native";

//api
import { searchAvailableCars } from "api/search";

// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import Header from "components/home/Header";
import RentDateAndTime from "components/rent_a_vehicle/RentDateAndTime";
import VehicleDropdown from "components/rent_a_vehicle/VehicleType";
import GearShiftDropdown from "components/rent_a_vehicle/GearType";
import FuelTypeDropdown from "components/rent_a_vehicle/FuelType";

import { colors } from "constants/Colors";
import PassengerCount from "components/rent_a_vehicle/PassengerCount";
import BaggageNumber from "components/rent_a_vehicle/BaggageNumber";
import PriceRate from "components/rent_a_vehicle/PriceRate";

const initialDateTimeValues = {
  startRentDate: new Date(),
  startRentTime: new Date(),
  endRentDate: new Date(),
  endRentTime: new Date(),
};

export default function RentAVehicle() {
  const [dateTimeValues, setDateTimeValues] = useState(initialDateTimeValues);
  const [vehicleType, setVehicleType] = useState("default");
  const [gearType, setGearType] = useState("default");
  const [fuelType, setFuelType] = useState("default");
  const [passengerNum, setPassengerNum] = useState("default");
  const [baggageNum, setBaggageNum] = useState("default");
  const [priceRate, setPriceRate] = useState("default");
  const [location, setLocation] = useState("default");

  // Use the useNavigation hook
  const navigation = useNavigation();

  const search = {
    dateTimeValues: dateTimeValues,
    filter: {
      vehicleType: vehicleType,
      gearType: gearType,
      fuelType: fuelType,
      passengerNum: passengerNum,
      baggageNum: baggageNum,
      priceRate: priceRate,
      location: location,
    },
  };

  useEffect(() => {
    console.log("search Object:", search);
  }, [
    dateTimeValues,
    vehicleType,
    gearType,
    fuelType,
    passengerNum,
    baggageNum,
    priceRate,
  ]);

  const handleSearch = async () => {
    const result = await searchAvailableCars(search);

    // Proceed to upload profile image screen when validation is all passed
    // navigation.navigate("rent-a-vehicle/search-result", { result });
    // console.log("result", result);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.row1Container}>
          <RentDateAndTime
            dateTimeValues={dateTimeValues}
            setDateTimeValues={setDateTimeValues}
          />
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#fff",
              marginTop: -6,
            }}
          ></View>

          <Text style={styles.filterText}>Filter ( Optional )</Text>

          <View style={styles.rowField}>
            <VehicleDropdown
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
            />
          </View>
          <View style={styles.rowField}>
            <GearShiftDropdown gearType={gearType} setGearType={setGearType} />
          </View>

          <View style={styles.rowField}>
            <FuelTypeDropdown fuelType={fuelType} setFuelType={setFuelType} />
            <PassengerCount setPassengerNum={setPassengerNum} />
          </View>
          <View style={styles.rowField}>
            <BaggageNumber setBaggageNum={setBaggageNum} />
            <PriceRate setPriceRate={setPriceRate} />
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#fff",
            }}
          ></View>
          <Text>
            Note : The location of your device will be used to find vehicles
            near you. (Required)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSearch()}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row2Container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  scroll: {
    flex: 1,
    height: "100%",
  },
  row1Container: {
    flex: 1,
    marginBottom: 15,
    flexDirection: "column",
    gap: 10,
    padding: 17,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  row2Container: {
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
  rowField: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blue.slitedark,
    gap: 10,
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
    fontSize: 16,
    fontWeight: "500",
  },
  label: {
    marginBottom: -15,
  },
});
