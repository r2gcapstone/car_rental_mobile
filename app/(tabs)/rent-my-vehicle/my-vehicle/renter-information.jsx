import { StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import formatDate2 from "utils/formatDate2";
import formatTime2 from "utils/formatTime2";
import appendAddress from "utils/appendAddress";
import firebaseTimestamp from "utils/FirebaseTimestamp";
import { router } from "expo-router";
import useSentenceCase from "hooks/useSentenceCase";
import { getRentingDoc } from "api/rental";
import { getUserData } from "api/user";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
//icon
import peso from "assets/icons/pesoWhite.png";

//layout
import MainLayout from "layouts/MainLayout";

const RenterInformation = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const [vehicleData, setVehicleData] = useState("");
  const [renterData, setRenterData] = useState({});
  const { toSentenceCase } = useSentenceCase();
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const { carId } = data;

  const {
    ownerNumber,
    userId,
    status,
    dateTime,
    pickupLocation,
    dropoffLocation,
    paymentMethod,
    rentDuration,
    priceRate,
    destination,
    totalPayment,
    distance,
    outsideRate,
  } = vehicleData;

  let cityDestination = "";
  try {
    cityDestination = toSentenceCase(destination.municipality.name);
  } catch (error) {}

  const { firstName, lastName, mobileNumber, email, address, imageUrl } =
    renterData;

  //format date back to firebase timeStamp
  let convertedData = {};
  try {
    convertedData = firebaseTimestamp(dateTime);
  } catch (error) {}

  let pickUp = "";
  let dropOff = "";
  try {
    pickUp = appendAddress(pickupLocation);
    dropOff = appendAddress(dropoffLocation);
  } catch (error) {}

  //convert to javascript date for ui
  let startDate = "";
  let startTime = "";
  let endDate = "";
  let endTime = "";

  try {
    startDate = formatDate2(convertedData.startDate.toDate());
    startTime = formatTime2(convertedData.startTime.toDate());
    endDate = formatDate2(convertedData.endDate.toDate());
    endTime = formatTime2(convertedData.endTime.toDate());
  } catch (error) {}

  let newAddress = "";
  try {
    newAddress = [
      address.subdivision,
      address.street,
      address.barangay.name,
      address.municipality.name,
      address.province.name,
    ]
      .filter(Boolean)
      .join(", ");
  } catch (error) {}

  const renterArray = [
    {
      id: 0,
      label: "Full Name :",
      value: firstName + " " + lastName,
    },
    { id: 1, label: "Mobile Number :", value: mobileNumber },
    { id: 2, label: "Email :", value: email },
    { id: 3, label: "Address :", value: newAddress },
  ];

  const dataArray = [
    { id: 0, label: "Booking Status :", value: toSentenceCase(status) },
    {
      id: 1,
      label: "Mobile Number :",
      value: ownerNumber ? ownerNumber : "none",
    },
    { id: 2, label: "Start Rent Date :", value: startDate },
    { id: 3, label: "Start Rent Time :", value: startTime },
    { id: 4, label: "End Rent Date :", value: endDate },
    { id: 5, label: "End Rent Time : ", value: endTime },
    { id: 6, label: "Pick-up Location :", value: toSentenceCase(pickUp) },
    { id: 7, label: "Drop-off Location :", value: toSentenceCase(dropOff) },
    {
      id: 8,
      label: "Method of Payment :",
      value: paymentMethod,
    },
    { id: 9, label: "Rent Duration :", value: `${rentDuration} Day(s)` },
    {
      id: 10,
      label: "Price Rate (Per Day) :",
      value: priceRate && priceRate.toLocaleString(),
    },
    {
      id: 11,
      label: "Destination(City) :",
      value: cityDestination,
    },
    {
      id: 12,
      label: "Outside of Origin Rate :",
      value: outsideRate && outsideRate.toLocaleString(),
    },
    {
      id: 13,
      label: "Distance between cities :",
      value: distance + " " + "km",
    },
  ];

  const fetchVehicleData = async (carId) => {
    try {
      const result = await getRentingDoc(carId);
      if (!result.error) {
        setVehicleData(result);
      }
    } catch (error) {}
  };

  const fetchRenterData = async (renterId) => {
    try {
      const result = await getUserData(renterId);
      if (!result.error) {
        setRenterData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      try {
        await fetchVehicleData(carId);
        hideLoading();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        hideLoading();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        showLoading();
        try {
          await fetchRenterData(userId);
          hideLoading();
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          hideLoading();
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Vehicle Renter Information</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.rentingInfo}>
          {!isLoading &&
            renterArray.map(
              (item) =>
                item.value && (
                  <View key={item.id} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <View style={styles.valueContainer}>
                      <Text style={styles.value}>{item.value}</Text>
                    </View>
                  </View>
                )
            )}
        </View>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Booking Information</Text>
        </View>
        <View style={styles.rentingInfo}>
          {!isLoading &&
            dataArray.map(
              (item) =>
                item.value && (
                  <View key={item.id} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <View style={styles.valueContainer}>
                      {[10, 12].includes(item.id) && (
                        <Image style={styles.icon} source={peso} />
                      )}
                      <Text style={styles.value}>{item.value}</Text>
                    </View>
                  </View>
                )
            )}
          <View style={[styles.row, styles.totalContent]}>
            <Text style={styles.totalLabel}>Total Amount :</Text>
            <View style={styles.valueContainer}>
              <Image style={styles.icon} source={peso} />
              <Text style={styles.totalValue}>
                {totalPayment && totalPayment.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#757575",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContaniner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  rentingInfo: {
    flex: 1,
    width: "100%",
    gap: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    width: "100%",
  },
  totalContent: {
    marginTop: 10,
  },
  totalValue: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    width: "100%",
  },
  totalContent: {
    marginTop: 10,
  },
  totalValue: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  icon: {
    width: 10,
    height: 12,
    marginRight: 6,
  },
});

export default RenterInformation;
