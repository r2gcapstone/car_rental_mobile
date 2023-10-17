import React, { useState, useEffect } from "react";
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
import ConfirmationModal from "components/modal/ConfirmationModal";
import { colors } from "constants/Colors";

//layout
import MainLayout from "layouts/MainLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getMyRentalLoc } from "api/rental";
import { updateRentalData } from "api/rental";
import { getVehicleInfo, updateCarData } from "api/cars";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { hide } from "expo-splash-screen";
import { deleteAVehicle } from "../../../../api/cars";

const SelectedVehicle = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [isGps, setIsGps] = useState(null);
  const [docId, setDocId] = useState(null);
  const [isHidden, setIsHidden] = useState(null);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

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
    {
      id: 3,
      label: "Edit Pick-Up Location",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/pickup-location",
    },
    {
      id: 4,
      label: "Edit Drop-Off Location",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/dropoff-location",
    },
    {
      id: 5,
      label: "Edit Documents",
      icon: doc,
      path: "(tabs)/rent-my-vehicle/upload-docs",
    },
    {
      id: 6,
      label: "Edit Price Rate",
      icon: dollar,
      path: "(tabs)/rent-my-vehicle/price-rate",
    },
    {
      id: 7,
      label: "Edit Method of Payment",
      icon: hand,
      path: "(tabs)/rent-my-vehicle/payment-option",
    },
    {
      id: 8,
      label: "Edit Outside of Origin Rate",
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
      id: 11,
      label: isGps ? "Turn Off GPS" : "Turn On GPS",
      icon: "",
      path: "",
      btnBgColor: { backgroundColor: "#1C8A00", opacity: !isGps ? 1 : 0.5 },
      btnText: { fontSize: 18, textAlign: "center" },
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
      label: isHidden ? "Show Vehicle" : "Hide Vehicle",
      icon: "",
      path: "",
      btnBgColor: { backgroundColor: isHidden ? "#0068C8" : "#C89000" },
      btnText: { fontSize: 18, textAlign: "center" },
    },
    {
      id: 14,
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
  };

  const handleOnPress = (path, label) => {
    if (label === "Turn Off GPS" || label === "Turn On GPS") {
      onClose("m1");
      return;
    } else if (label === "Hide Vehicle" || label === "Show Vehicle") {
      onClose("m2");
      return;
    } else if (label === "Delete Vehicle") {
      onClose("m3");
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

  const fetchGPSStatus = async (carId) => {
    try {
      const result = await getMyRentalLoc(carId);
      if (!result.error) {
        setIsGps(result.location.status === "off" ? false : true);
        setDocId(result.docId);
      }
    } catch (error) {}
  };

  const fetchHiddenStatus = async (carId, modal) => {
    if (modal === "m1") {
      try {
        const result = await getMyRentalLoc(carId);
        if (!result.error) {
          setIsGps(result.location.status === "off" ? false : true);
          setDocId(result.docId);
        }
      } catch (error) {}
    } else if (modal === "m2") {
      try {
        const result = await getVehicleInfo(carId);
        if (!result.error) {
          setIsHidden(result.isHidden);
        }
      } catch (error) {}
    }
  };

  const handleOkayBtn = async (docId, modal) => {
    if (modal === "m1") {
      onClose("m1");
      try {
        await updateRentalData(isGps ? "off" : "on", docId);
        setIsGps((prev) => !prev);
      } catch (error) {}
    } else if (modal === "m2") {
      try {
        onClose("m2");
        await updateCarData("isHidden", !isHidden, docId);
        setIsHidden((prev) => !prev);
      } catch (error) {}
    } else {
      try {
        const result = await deleteAVehicle(docId);
        onClose("m3");
        if (!result.error) {
          router.push("/");
        }
      } catch (error) {}
    }
  };

  const onClose = (modal) => {
    if (modal === "m1") {
      setModal((prev) => !prev);
    } else if (modal === "m2") {
      setModal2((prev) => !prev);
    } else {
      setModal3((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchGPSStatus(carId, "m1");
    fetchHiddenStatus(carId, "m2");
  }, [isGps, isHidden]);

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
      {modal && (
        <ConfirmationModal
          title="Are you sure?"
          caption={() =>
            isGps ? (
              <Text style={styles.captionText}>
                This will disable the GPS Tracking feature
              </Text>
            ) : (
              <Text style={styles.captionText}>
                This will enable the GPS Tracking feature
              </Text>
            )
          }
          onClose={() => onClose("m1")}
          btn1Text="Yes"
          btn2Text="No"
          btn1Props={{
            backgroundColor: colors.green.primary,
          }}
          handleOkayBtn={() => handleOkayBtn(docId, "m1")}
        />
      )}
      {modal2 && (
        <ConfirmationModal
          title="Are you sure?"
          caption={() =>
            isGps ? (
              <Text style={styles.captionText}>
                This will hide your vehicle from everywhere.
              </Text>
            ) : (
              <Text style={styles.captionText}>
                This will show your vehicle from everywhere (if subscribed).
              </Text>
            )
          }
          onClose={() => onClose("m2")}
          btn1Text="Yes"
          btn2Text="No"
          btn1Props={{
            backgroundColor: isHidden ? "#0068C8" : "#C89000",
          }}
          handleOkayBtn={() => handleOkayBtn(modal2 && carId, "m2")}
        />
      )}
      {modal3 && (
        <ConfirmationModal
          title="Are you sure?"
          caption={() => (
            <Text style={styles.captionText}>
              This will delete your vehicle permanently
            </Text>
          )}
          onClose={() => onClose("m3")}
          btn1Text="Yes"
          btn2Text="No"
          btn1Props={{
            backgroundColor: colors.red.primary,
          }}
          handleOkayBtn={() => handleOkayBtn(modal3 && carId, "m3")}
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
