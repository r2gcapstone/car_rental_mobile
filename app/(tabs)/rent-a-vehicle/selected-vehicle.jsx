import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
//layout
import MainLayout from "layouts/MainLayout";

import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
//Icon
import star from "assets/icons/star.png";

import useSentenceCase from "hooks/useSentenceCase";
import ImagePreviewer from "components/ImagePreview";

const SelecedVehicle = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();

  const {
    vehicleDetails: {
      vehicleName,
      vehicleType,
      gearType,
      fuelType,
      passengerCount,
      luggageCount,
      plateNumber,
    },
    imageUrls,
    ownerName,
  } = data;

  const dataArray = [
    { key: 1, label: "Vehicle Owner :", value: ownerName },
    { key: 2, label: "Vehicle Type :", value: vehicleType },
    { key: 3, label: "Gear Shift :", value: gearType },
    { key: 4, label: "Type of Fuel :", value: fuelType },
    { key: 5, label: "Passengers :", value: passengerCount },
    { key: 6, label: "Baggage(s) :", value: luggageCount },
    { key: 7, label: "Plate Number :", value: plateNumber },
  ];

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImagePreviewer imageUrls={imageUrls} />
          <Text style={styles.carName}>{toSentenceCase(vehicleName)}</Text>
        </View>
        <View style={styles.dataHeader}>
          <Text style={styles.header}>Vehicle Information</Text>
        </View>
        {dataArray.map((item) => (
          <View key={item.key} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.textData}>
                {typeof item.value === "string"
                  ? toSentenceCase(item.value)
                  : item.value}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.dataHeader}>
          <Text style={styles.header}>Others</Text>
        </View>
        <ProceedBtn
          data={data}
          icon={star}
          contProps={{ marginBottom: 10, opacity: 0.8 }}
          btnProps={{ fontSize: 14, fontWeight: "normal" }}
          btnText={"Vehicle Ratings & Reviews"}
          path={"rent-a-vehicle/vehicle-reviews"}
        />
        <ProceedBtn
          data={data}
          contProps={{}}
          btnProps={{ fontSize: 18 }}
          btnText={"Proceed"}
          path={"rent-a-vehicle/destination-confirmation"}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default SelecedVehicle;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  imageContainer: {
    paddingVertical: 20,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  carName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    fontSize: 21,
    paddingBottom: 10,
    paddingTop: 20,
  },
  dataHeader: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
  },

  header: {
    fontWeight: "bold",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingLeft: 6,
  },
  textData: {
    color: "#fff",
  },
  header: {
    fontSize: 16,
  },
  dataContainer: {
    width: "30%",
  },
});
