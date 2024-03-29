import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import BouncyCheckbox from "react-native-bouncy-checkbox";

//layout
import MainLayout from "layouts/MainLayout";
//api
import { searchAvailableCars } from "api/search";
// Components
import Text from "components/ThemedText";
import Header from "components/home/Header";
import RentDateAndTime from "components/rent_a_vehicle/RentDateAndTime";
import VehicleDropdown from "components/rent_a_vehicle/VehicleType";
import GearShiftDropdown from "components/rent_a_vehicle/GearType";
import FuelTypeDropdown from "components/rent_a_vehicle/FuelType";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import InputField from "components/InputField";
import { updateSubscription } from "api/subscription";

import { colors } from "constants/Colors";

const initialDateTimeValues = {
  startRentDate: new Date(),
  startRentTime: new Date(),
  endRentDate: new Date(),
  endRentTime: new Date(),
};

export default function RentAVehicle() {
  const [dateTimeValues, setDateTimeValues] = useState(initialDateTimeValues);
  const [isDate, setIsDate] = useState(true);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [isFilter, setIsFilter] = useState(false);

  const [filter, setFilter] = useState({
    vehicleType: "",
    gearType: "",
    fuelType: "",
    passengerCount: "",
    luggageCount: "",
    priceRate: "",
    location: "",
  });

  const handleOnhangeText = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };
  const handleSearch = async () => {
    //update here also the subscription status for all documents
    //Not recommended but it works for now.
    updateSubscription();
    try {
      showLoading();
      const result = await searchAvailableCars(filter);
      hideLoading();

      if (result.error) {
        return alert("No result found!");
      }

      const { startRentDate, startRentTime, endRentDate, endRentTime } =
        dateTimeValues;
      const newDateObject = {
        startRentDate: Timestamp.fromDate(startRentDate),
        startRentTime: Timestamp.fromDate(startRentTime),
        endRentDate: Timestamp.fromDate(endRentDate),
        endRentTime: Timestamp.fromDate(endRentTime),
      };

      const data = { result, dateTime: newDateObject };
      router.push({
        pathname: "rent-a-vehicle/search-result",
        params: { data: JSON.stringify(data) },
      });
    } catch (error) {
      alert("No result found!");
    }
  };

  useEffect(() => {
    const { startRentDate, endRentDate } = dateTimeValues;

    //check if endRentDate is not set
    let currentDate = new Date();

    // Set the time to midnight for each date
    let StartDateInMN = startRentDate.setHours(0, 0, 0, 0);
    let EndDateInMN = endRentDate.setHours(0, 0, 0, 0);

    if (
      StartDateInMN !== EndDateInMN &&
      startRentDate < endRentDate &&
      startRentDate >= currentDate
    ) {
      setIsDate(false);
    } else {
      setIsDate(true);
    }
  }, [dateTimeValues]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        {/* 1st row */}
        <View style={styles.row1Container}>
          <RentDateAndTime
            dateTimeValues={dateTimeValues}
            setDateTimeValues={setDateTimeValues}
          />
          {/* //line */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#fff",
              marginTop: -6,
            }}
          ></View>

          <View style={{ flexDirection: "row", gap: -8 }}>
            <BouncyCheckbox
              size={25}
              fillColor="#2DCB2A"
              unfillColor="#FFFFFF"
              style={styles.checkBox}
              innerIconStyle={{ borderWidth: 0 }}
              onPress={() => {
                setIsFilter((prevValue) => !prevValue);
              }}
            />
            <Text style={styles.filterText}>Filter ( Optional )</Text>
          </View>

          {isFilter && (
            <View>
              {/* VehicleType Dropdown */}
              <VehicleDropdown formData={filter} setFormData={setFilter} />
              {/* GearType Dropdown */}
              <GearShiftDropdown formData={filter} setFormData={setFilter} />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                {/* FuelType Dropdown */}
                <FuelTypeDropdown formData={filter} setFormData={setFilter} />
                {/* PassengerCount Field */}
                <InputField
                  label={"Passengers :"}
                  keyboardType="number-pad"
                  type="number"
                  name="passengerCount"
                  onChangeText={(value) =>
                    handleOnhangeText("passengerCount", value)
                  }
                  isTextError={false}
                  required
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                {/* LuggageCount Field */}
                <InputField
                  label={"Number of Luggage :"}
                  keyboardType="number-pad"
                  type="number"
                  name="luggageCount"
                  onChangeText={(value) =>
                    handleOnhangeText("luggageCount", value)
                  }
                  required
                />
                {/*PriteRate Field */}
                <InputField
                  label={"Price Rate (per day) :"}
                  keyboardType="number-pad"
                  type="number"
                  name="PriceRate"
                  onChangeText={(value) =>
                    handleOnhangeText("priceRate", value)
                  }
                  required
                />
              </View>
            </View>
          )}

          {/* //line */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#fff",
            }}
          ></View>
          <Text>
            The city or municipality indicated in your address will be employed
            to locate the vehicle within your area.
          </Text>
          <TouchableOpacity
            disabled={isDate}
            style={[styles.button, { opacity: isDate ? 0.5 : 1 }]}
            onPress={() => handleSearch()}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {/* 2nd row */}
        <View style={styles.row2Container}>
          <View style={styles.col}>
            <Image
              style={styles.icon}
              source={require("assets/icons/clipboard.png")}
            />
            <Text style={styles.btnText}>My Application for Renting</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push("(tabs)/rent-a-vehicle/renting-application")
            }
            style={styles.viewContainer}
          >
            <Text>View</Text>
            <Image
              style={styles.arrowIcon}
              source={require("assets/icons/arrowWhite.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingComponent />
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
    flexDirection: "row",
    backgroundColor: colors.blue.slitedark,
  },
  rowField: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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
  col: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
