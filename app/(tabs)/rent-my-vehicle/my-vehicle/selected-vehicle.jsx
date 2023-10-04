import React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import Text from "components/ThemedText";
import useSentenceCase from "hooks/useSentenceCase";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
//Icon
import {
  hand,
  gear,
  doc,
  dollar,
  globe,
  img,
  road,
  star,
  subscription,
} from "assets/icons";

//layout
import MainLayout from "layouts/MainLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

const SelectedVehicle = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();

  const {
    imageUrls: { front },
    vehicleDetails: { vehicleName },
    status,
    subscriptionStatus,
    rentee,
    carId,
  } = data;

  const btnArray = [
    {
      id: 1,
      label: "Edit Vehicle Information",
      icon: gear,
      path: "(tabs)/rent-my-vehicle/register-vehicle",
    },
    {
      id: 2,
      label: "Edit Vehicle Image",
      icon: img,
      path: "(tabs)/rent-my-vehicle/upload-screen",
    },
    { id: 3, label: "Edit Location", icon: doc, path: "" },
    {
      id: 4,
      label: "Edit Documents",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/upload-docs",
    },
    {
      id: 5,
      label: "Edit Price Rate",
      icon: dollar,
      path: "(tabs)/rent-my-vehicle/price-rate",
    },
    { id: 6, label: "Edit Method of Payment", icon: hand, path: "" },
    {
      id: 7,
      label: "Edit Outside of Origin Rate",
      icon: road,
      path: "",
      style: { width: "100%", paddingBottom: 4 },
      alignText: { justifyContent: "center" },
      btnText: { flex: 0, fontSize: 18 },
    },
    {
      id: 8,
      label: "Vehicle Rating & Review",
      icon: star,
      path: "",
      style: {
        width: "100%",
        borderTopColor: "#fff",
        borderTopWidth: 1,
        paddingTop: 10,
      },
      alignText: { justifyContent: "center" },
      btnText: { flex: 0, fontSize: 18 },
    },
    {
      id: 9,
      label: "Buy Subscription",
      icon: subscription,
      path: "",
      style: { width: "100%" },
      alignText: { justifyContent: "center" },
      btnText: { flex: 0, fontSize: 18, textAlign: "center" },
    },
    {
      id: 10,
      label: "Turn Off GPS",
      icon: "",
      path: "",
      btnBgColor: { backgroundColor: "#1C8A00" },
      btnText: { fontSize: 18, textAlign: "center" },
    },
    {
      id: 11,
      label: "GPS Tracker",
      icon: globe,
      path: "",
      btnBgColor: { backgroundColor: "#1C8A00" },
      btnText: { flex: 0, fontSize: 18, textAlign: "center" },
    },
    {
      id: 12,
      label: "Hide Vehicle",
      icon: "",
      path: "",
      btnBgColor: { backgroundColor: "#C89000" },
      btnText: { fontSize: 18, textAlign: "center" },
    },
    {
      id: 13,
      label: "Delete Vehicle",
      icon: "",
      path: "",
      btnBgColor: { backgroundColor: "#FF0000" },
      btnText: { fontSize: 18, textAlign: "center" },
    },
  ];

  const newObject = { mode: "update", carId: carId };

  const handleOnPress = (path, label) => {
    router.push({
      pathname: path,
      params: { data: JSON.stringify({ ...newObject, label: label }) },
    });
  };
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: front }} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.carName}>{toSentenceCase(vehicleName)}</Text>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.status,
                {
                  backgroundColor: status !== "booked" ? "#FF0000" : "#0068C8",
                },
              ]}
            >
              {status === "booked" ? (
                <>
                  Booked By :{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {toSentenceCase(rentee)}
                  </Text>
                </>
              ) : (
                toSentenceCase(status)
              )}
            </Text>
            <Text
              style={[
                styles.status,
                {
                  backgroundColor:
                    subscriptionStatus !== "subscribed" ? "#526D82" : "#FF5C00",
                },
              ]}
            >
              {toSentenceCase(subscriptionStatus)}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          {btnArray.map(
            ({
              id,
              style,
              path,
              btnBgColor,
              alignText,
              icon,
              btnText,
              label,
            }) => (
              <View key={id} style={[styles.btnDiv, style]}>
                <TouchableOpacity
                  onPress={() => handleOnPress(path, label)}
                  style={[styles.btn, btnBgColor]}
                >
                  <View style={[styles.btnTextContainer, alignText]}>
                    {icon && <Image style={styles.icon} source={icon} />}

                    <Text style={[styles.btnText, btnText]}>{label}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default SelectedVehicle;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  imageContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#757575",
    alignSelf: "center",
  },
  detailContainer: {
    gap: 2,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  carName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 4,
  },
  status: {
    borderRadius: 100,
    width: "auto",
    padding: 4,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  btnContainer: {
    flex: 0,
    height: "auto",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  btnDiv: {
    width: "48.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextContainer: {
    gap: 6,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#526D82",
    height: 60,
    alignSelf: "center",
  },
  btnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
  },
});
