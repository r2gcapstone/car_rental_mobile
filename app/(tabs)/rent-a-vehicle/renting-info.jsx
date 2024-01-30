import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import useSentenceCase from "hooks/useSentenceCase";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import { useUserContext } from "context/UserContext";
import { Timestamp } from "firebase/firestore";
import { getDistanceBetweenCities } from "utils/calculateDistanceBetweenCity";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";

//utils
import formatdate2 from "utils/formatDate2";
import formatTime2 from "utils/formatTime2";
import countTotalDays from "utils/calculateDays";
//icon
import peso from "assets/icons/pesoWhite.png";

//layout
import MainLayout from "layouts/MainLayout";

const RentingInfo = () => {
  const { user } = useUserContext();
  const fullName = user.firstName + " " + user.lastName;
  const [distance, setDistance] = useState("");
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const {
    pickupLocation,
    dropoffLocation,
    paymentOption,
    priceRate,
    destination,
    carId,
    userId,
    imageUrls,
    vehicleDetails,
    outsideRate,
  } = data;

  const p = { ...pickupLocation };
  const d = { ...dropoffLocation };
  const pickUp = [
    p.streetName,
    p.houseNumber,
    p.barangay.name,
    p.municipality.name,
    p.zipCode,
    p.province.name,
  ]
    .filter(Boolean)
    .join(", ");

  const dropOff = [
    d.streetName,
    d.houseNumber,
    d.barangay.name,
    d.municipality.name,
    d.zipCode,
    d.province.name,
  ]
    .filter(Boolean)
    .join(", ");

  //format date back to firebase timeStamp
  const convertedData = {
    startRentDate: Timestamp.fromMillis(
      data.dateTime.startRentDate.seconds * 1000 +
        data.dateTime.startRentDate.nanoseconds / 1000000
    ),
    startRentTime: Timestamp.fromMillis(
      data.dateTime.startRentTime.seconds * 1000 +
        data.dateTime.startRentTime.nanoseconds / 1000000
    ),
    endRentDate: Timestamp.fromMillis(
      data.dateTime.endRentDate.seconds * 1000 +
        data.dateTime.endRentDate.nanoseconds / 1000000
    ),
    endRentTime: Timestamp.fromMillis(
      data.dateTime.endRentTime.seconds * 1000 +
        data.dateTime.endRentTime.nanoseconds / 1000000
    ),
  };

  //convert to javascript date for ui
  let startDate = convertedData.startRentDate.toDate();
  let startTime = convertedData.startRentTime.toDate();
  let endDate = convertedData.endRentDate.toDate();
  let endTime = convertedData.endRentTime.toDate();

  const bookingArray = [
    { id: 1, label: "Start Rent Date:", value: formatdate2(startDate) },
    { id: 2, label: "Start Rent Time :", value: formatTime2(startTime) },
    { id: 3, label: "End Rent Date :", value: formatdate2(endDate) },
    { id: 4, label: "End Rent Time :", value: formatTime2(endTime) },
    { id: 5, label: "Pick-up Location :", value: pickUp },
    { id: 6, label: "Drop-off Location : ", value: dropOff },
  ];

  //calculate total days
  const rentDuration = countTotalDays(startDate, endDate);
  //calculate total payment based on rate plus additional cost for outside destination if chosen
  let total = "";
  let subTotal = "";
  try {
    subTotal = rentDuration * priceRate;
    total = subTotal;
    //check if outside destination is true
    if (destination.municipality.name) {
      total = subTotal + +distance * outsideRate;
    }
  } catch (error) {}

  const paymentArray = [
    { id: 1, label: "Method of Payment:", value: paymentOption },
    {
      id: 2,
      label: "Rent Duration :",
      value:
        rentDuration && +rentDuration < 1
          ? "1 day"
          : rentDuration.toString() + " day(s)",
    },
    {
      id: 3,
      icon: peso,
      label: "Price Rate (Per day) :",
      value: priceRate.toLocaleString(),
    },
    {
      id: 4,
      icon: peso,
      label: "Sub Total :",
      value: destination.municipality.name && subTotal.toLocaleString(),
    },
    {
      id: 5,
      label: "Destination(City) :",
      value: destination.municipality.name,
    },
    {
      id: 6,
      icon: peso,
      label: "Outside of Origin Rate :",
      value:
        destination.municipality.name && outsideRate.toLocaleString() + " x",
    },
    {
      id: 7,
      label: "Distance in Kilometer :",
      value: distance ? distance.toString() + " " + "km" : "",
    },
  ];

  const newObject = {
    rentInformation: {
      totalPayment: total,
      dateTime: { ...convertedData },
      rentDuration: rentDuration,
      imageUrl: imageUrls.front,
      priceRate,
      paymentMethod: paymentOption,
      pickupLocation,
      dropoffLocation,
      destination,
      userId,
      carId,
      vehicleDetails,
      rentee: fullName,
      distance: distance,
      outsideRate,
    },
  };

  const getDistance = async (city1, city2) => {
    try {
      showLoading();
      const result = await getDistanceBetweenCities(city1, city2);
      hideLoading();
      setDistance(result);
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    //calculate distance from city of origin
    if (destination.municipality.name) {
      const city1 = [p.municipality.name, p.province.name].join(" ");
      const currentCity = city1;
      const Destination =
        destination.municipality.name + " " + "Negros Occidental";

      getDistance(currentCity, Destination);
    }
  }, [destination.municipality.name]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <Text style={styles.header}>Booking Information</Text>
          <View style={styles.box}>
            {bookingArray.map((item) => (
              <View key={item.id} style={styles.content}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{toSentenceCase(item.value)}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>Payment Information</Text>
          <View style={styles.box}>
            {paymentArray.map(
              (item) =>
                item.value && (
                  <View key={item.id} style={styles.content}>
                    <Text style={styles.label}>{item.label}</Text>
                    <View style={styles.valueContainer}>
                      {item.icon && (
                        <Image style={styles.icon} source={item.icon} />
                      )}

                      <Text style={styles.value2}>
                        {item.label === "Method of Payment:"
                          ? item.value
                          : item.value}
                      </Text>
                    </View>
                  </View>
                )
            )}
            <View style={[styles.content, styles.totalContent]}>
              <Text style={styles.totalLabel}>Total Amount :</Text>
              <View style={styles.valueContainer}>
                <Image
                  style={[styles.icon, { width: 14, height: 16 }]}
                  source={peso}
                />

                <Text style={styles.totalValue}>
                  {Number(total).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ProceedBtn
          data={newObject}
          contProps={{
            backgroundColor: colors.blue.slitedark,
            marginBottom: 20,
            marginTop: 20,
            bottom: 0,
          }}
          btnProps={{ fontSize: 16, fontWeight: "bold" }}
          btnText={"Proceed"}
          path={"rent-a-vehicle/rules-regulation"}
        />
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

export default RentingInfo;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  row: {
    marginVertical: 10,
    gap: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  box: {
    borderTopWidth: 1,
    borderColor: "#fff",
  },
  content: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  totalContent: {
    marginTop: 20,
  },
  valueContainer: {
    width: "35%",
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    width: "35%",
  },
  value2: {
    width: "100%",
  },
  totalValue: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },

  icon: {
    width: 10,
    height: 12,
    marginRight: 6,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
