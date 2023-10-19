import React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import useSentenceCase from "hooks/useSentenceCase";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import { useUserContext } from "context/UserContext";
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
  const userName = user.firstName + " " + user.lastName;
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const {
    pickupLocation,
    dropoffLocation,
    paymentOption,
    priceRate,
    dateTime: { startRentDate, startRentTime, endRentDate, endRentTime },
    destination,
    carId,
    userId,
    imageUrls,
    vehicleDetails,
  } = data;

  const p = { ...pickupLocation };
  const d = { ...dropoffLocation };
  const pickUp = `${p.streetName}, ${p.houseNumber}, ${p.barangay.name}, ${p.municipality.name}, ${p.zipCode} ${p.province.name}`;
  const dropOff = `${d.streetName}, ${d.houseNumber}, ${d.barangay.name}, ${d.municipality.name}, ${d.zipCode} ${d.province.name}`;

  //format dates
  const startDate = formatdate2(startRentDate);
  const endDate = formatdate2(endRentDate);
  const startTime = formatTime2(startRentTime);
  const endTime = formatTime2(endRentTime);

  const bookingArray = [
    { id: 1, label: "Start Rent Date:", value: startDate },
    { id: 2, label: "Start Rent Time :", value: startTime },
    { id: 3, label: "End Rent Date :", value: endDate },
    { id: 4, label: "End Rent Time :", value: endTime },
    { id: 5, label: "Pick-up Location :", value: pickUp },
    { id: 6, label: "Drop-off Location : ", value: dropOff },
  ];

  //calculate total days
  const rentDuration = countTotalDays(startRentDate, endRentDate);
  //calculate total payment based on rate or outside rate per day if destination data is provided
  let total = 0;
  if (destination.municipality) {
    total = rentDuration * destination.rate;
  } else {
    total = rentDuration * priceRate;
  }

  const paymentArray = [
    { id: 1, label: "Method of Payment:", value: paymentOption },
    {
      id: 2,
      label: "Rent Duration :",
      value: rentDuration.toString() + " day(s)",
    },
    {
      id: 3,
      icon: peso,
      label: "Price Rate (Per day) :",
      value: priceRate.toString(),
    },
    {
      id: 4,
      label: "Outside of Origin Location :",
      value: destination.municipality,
    },
    {
      id: 5,
      icon: peso,
      label: "Outside of Origin Rate :",
      value: destination.rate.toString(),
    },
  ];

  const newObject = {
    rentInformation: {
      totalPayment: total,
      dateTime: { startDate, startTime, endDate, endTime },
      rentDuration: rentDuration,
      imageUrl: imageUrls.front,
      priceRate,
      paymentMethod: paymentOption,
      pickupLocation,
      dropoffLocation,
      destination,
      ownerId: userId,
      carId,
      vehicleDetails,
      rentee: userName,
    },
  };

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
                        {toSentenceCase(item.value)}
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

                <Text style={styles.totalValue}>{total}</Text>
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
