import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
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
import ConfirmationModal from "components/modal/ConfirmationModal";
import { colors } from "constants/Colors";

//layout
import MainLayout from "layouts/MainLayout";
import { deleteAVehicle } from "api/cars";

const SelectedVehicle = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const [modal, setModal] = useState(false);

  const {
    imageUrls: { front },
    vehicleDetails: { vehicleName },
    isRented,
    isSubscribed,
    rentee,
    carId,
    ownerNumber,
    ownerUsername,
  } = data;

  const btnArray = [
    {
      id: 1,
      label: "Vehicle Information",
      icon: gear,
      path: "(tabs)/rent-my-vehicle/register-vehicle",
    },
    {
      id: 2,
      label: "Vehicle Image",
      icon: img,
      path: "(tabs)/rent-my-vehicle/upload-screen",
    },
    {
      id: 3,
      label: "Pick-Up Location",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/pickup-location",
    },
    {
      id: 4,
      label: "Drop-Off Location",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/dropoff-location",
    },
    {
      id: 5,
      label: "Documents",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/upload-docs",
    },
    {
      id: 6,
      label: "Price Rate",
      icon: dollar,
      path: "(tabs)/rent-my-vehicle/price-rate",
    },
    {
      id: 7,
      label: "Payment Method",
      icon: hand,
      path: "(tabs)/rent-my-vehicle/payment-option",
    },
    {
      id: 8,
      label: "Outside of Origin Rate",
      icon: road,
      path: "(tabs)/rent-my-vehicle/outside-of-origin",
    },
    {
      id: 9,
      label: "Vehicle Rating & Review",
      icon: star,
      path: "(tabs)/rent-a-vehicle/vehicle-reviews",
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
      id: 10,
      label: "Buy Subscription",
      icon: subscription,
      path: "(tabs)/rent-my-vehicle/my-vehicle/buy-subscription",
      style: { width: "100%" },
      alignText: { justifyContent: "center" },
      btnText: { flex: 0, fontSize: 18, textAlign: "center" },
    },
    {
      id: 12,
      label: "GPS Tracker",
      icon: globe,
      path: "rent-my-vehicle/my-vehicle/tracker",
      btnBgColor: { backgroundColor: "#1C8A00" },
      btnText: { flex: 0, fontSize: 18, textAlign: "center" },
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

  const newObject = {
    mode: "update",
    carId: carId,
    vehicleDetails: { vehicleName },
    imageUrls: { front },
    ownerNumber: ownerNumber,
    ownerUsername: ownerUsername,
  };

  const handleOnPress = (path, label) => {
    if (label === "Delete Vehicle") {
      onClose();
      return;
    }

    router.push({
      pathname: path,
      params: {
        data: JSON.stringify({
          ...newObject,
          label: label,
          placeOrigin: data.pickupLocation.municipality.name,
        }),
      },
    });
  };

  const handleOkayBtn = async (docId) => {
    try {
      const result = await deleteAVehicle(docId);
      onClose();
      if (!result.error) {
        router.push("/");
      }
    } catch (error) {}
  };

  const onClose = () => {
    setModal((prev) => !prev);
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
                  backgroundColor: "#526D82",
                },
              ]}
            >
              {isRented ? (
                <>
                  Booked By :{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {toSentenceCase(rentee)}
                  </Text>
                </>
              ) : (
                "Not Booked"
              )}
            </Text>
            <Text
              style={[
                styles.status,
                {
                  backgroundColor: "#526D82",
                },
              ]}
            >
              {isSubscribed ? "Subscribed" : "Not Subscribed"}
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

      {modal && (
        <ConfirmationModal
          title="Are you sure?"
          caption={() => (
            <Text style={styles.captionText}>
              This will delete your vehicle permanently
            </Text>
          )}
          onClose={() => onClose()}
          btn1Text="Yes"
          btn2Text="No"
          btn1Props={{
            backgroundColor: colors.red.primary,
          }}
          handleOkayBtn={() => handleOkayBtn(modal && carId)}
        />
      )}
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
    height: 250,
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
