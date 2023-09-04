import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";

//layout
import MainLayout from "layouts/MainLayout";
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
import LoadingAnimation from "components/LoadingAnimation";
import PassengerCount from "components/rent_a_vehicle/PassengerCount";
import BaggageNumber from "components/rent_a_vehicle/BaggageNumber";
import PriceRate from "components/rent_a_vehicle/PriceRate";

import { colors } from "constants/Colors";

const initialDateTimeValues = {
  startRentDate: new Date(),
  startRentTime: new Date(),
  endRentDate: new Date(),
  endRentTime: new Date(),
};

export default function RentAVehicle() {
  const [dateTimeValues, setDateTimeValues] = useState(initialDateTimeValues);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({
    vehicleType: "",
    gearType: "",
    fuelType: "",
    passengerNum: "",
    baggageNum: "",
    priceRate: "",
    location: "",
  });

  // Use the useNavigation hook
  const navigation = useNavigation();

  const search = {
    filter: { ...filter },
    dateTimeValues: dateTimeValues,
  };

  const handleSearch = async () => {
    setIsLoading(true); // Show loading modal
    const result = await searchAvailableCars(search);

    if (result.status === 204) {
      setIsLoading(false);
      alert("No Result found");
      return;
    }

    setIsLoading(false);
    navigation.navigate("rent-a-vehicle/search-result", { result });
  };

  useEffect(() => {
    console.log("search Object:", filter);
  }, [filter]);

  return (
    <MainLayout>
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
            <VehicleDropdown filter={filter} setFilter={setFilter} />
          </View>
          <View style={styles.rowField}>
            <GearShiftDropdown filter={filter} setFilter={setFilter} />
          </View>

          <View style={styles.rowField}>
            <FuelTypeDropdown filter={filter} setFilter={setFilter} />
            <PassengerCount filter={filter} setFilter={setFilter} />
          </View>
          <View style={styles.rowField}>
            <BaggageNumber filter={filter} setFilter={setFilter} />
            <PriceRate filter={filter} setFilter={setFilter} />
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
      <LoadingAnimation isVisible={isLoading} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
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
