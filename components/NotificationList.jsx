import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useUserContext } from "context/UserContext";
import {
  getSubscriptionData,
  getVehicleRegistrationlData,
} from "api/notifications";
import {
  getAllRentals,
  getFinishedRental,
  updateRentalDataField,
} from "api/rental";
import { updateSubscriptionData } from "api/subscription";
import { updateCarData } from "api/cars";

//notfiMessages
import { notifications } from "constants/message/notification";

const NotificationList = ({ from }) => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [vehicleReg, setVehicleReg] = useState([]);
  const [finishedRental, setFinishedRental] = useState([]);
  const isFocused = useIsFocused();
  const { user, setUser } = useUserContext();
  const {
    subExpired,
    subResponseApproved,
    subResponseDenied,
    regResponseApproved,
    regResponseDenied,
  } = notifications;

  const getRentingDetails = async () => {
    try {
      showLoading();
      const result = await getAllRentals();
      if (Array.isArray(result)) {
        setData(result);
      }
    } catch (error) {
      alert("There has been an error fetching Rental Notification.");
    }
  };

  const fetchSubData = async () => {
    try {
      showLoading();
      const [result, result2, result3] = await Promise.all([
        getSubscriptionData("approved"),
        getSubscriptionData("declined"),
        getSubscriptionData("expired"),
      ]);

      const combined = [...result, ...result2, ...result3];

      if (Array.isArray(combined)) {
        setSubData(combined);
      }
    } catch (error) {
      console.error(error);
      alert("There has been an error fetching subscription Notification.");
    } finally {
      hideLoading();
    }
  };

  const fetchVehicleRegistrationlData = async () => {
    try {
      showLoading();
      const [result, result2] = await Promise.all([
        getVehicleRegistrationlData("approved"),
        getVehicleRegistrationlData("declined"),
      ]);

      const combined = [...result, ...result2];

      if (Array.isArray(combined)) {
        setVehicleReg(combined); // You should set combined array, not just result
      }
    } catch (error) {
      console.error(error);
      alert(
        "There has been an error fetching vehicle registration Notification."
      );
    } finally {
      hideLoading();
    }
  };

  const finishedRentals = async () => {
    try {
      const result = await getFinishedRental();
      if (Array.isArray(result)) {
        setFinishedRental(result);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      alert("There has been an error fetching Rental Notification.");
    }
  };

  const handleOnPress = (index) => {
    let path = "(notification)/booking-information";

    if (data[index]) {
      router.push({
        pathname: path,
        params: { data: JSON.stringify(data[index]), from: from },
      });
    }
  };

  const handleOnPress2 = async (index) => {
    let status = subData[index].status;
    try {
      let path = "";

      if (status === "approved") {
        path = "(tabs)/rent-my-vehicle/subscription/my-subscription";
        await updateSubscriptionData("status", "ongoing", subData[index].docId);
      } else if (status === "declined") {
        path = "(notification)/admin-message";
        await updateSubscriptionData("viewed", true, subData[index].docId);
      } else if (status === "expired") {
        path = "(tabs)/rent-my-vehicle/subscription/buy-subscription";
        await updateSubscriptionData(
          "expiredStatus",
          true,
          subData[index].docId
        );
      }

      if (subData[index]) {
        router.push({
          pathname: path,
          params: { data: JSON.stringify(subData[index]), from: from },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnPress3 = async (index) => {
    let status = vehicleReg[index].status;
    try {
      let path = "";

      if (status === "approved") {
        path = "(tabs)/rent-my-vehicle/subscription/buy-subscription";
        await updateCarData("status", "ongoing", vehicleReg[index].carId);
      } else if (status === "declined") {
        path = "(notification)/admin-message";
        await updateCarData("viewed", true, vehicleReg[index].carId);
      }

      if (vehicleReg[index]) {
        router.push({
          pathname: path,
          params: { data: JSON.stringify(vehicleReg[index]), from: from },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnPressReview = (index) => {
    if (finishedRental[index]) {
      router.push({
        pathname: "(notification)/write-review",
        params: { data: JSON.stringify(finishedRental[index]) },
      });
    } else {
      router.push("(notification)/write-review");
    }
  };

  //set field to viewed
  const updateFields = async () => {
    for (let { docId } of data) {
      await updateRentalDataField("viewed", true, docId);
    }
    for (let { docId } of finishedRental) {
      await updateRentalDataField("viewed", true, docId);
    }
  };

  //components
  const RentingRequestNotif = () => (
    <View style={styles.wrapper2}>
      {data.length > 0 &&
        data.map(({ imageUrl, remainingHours }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.container]}
            onPress={() => handleOnPress(index)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={{ uri: imageUrl }} />
              <View style={styles.col}>
                <Text style={styles.Message}>
                  You have {remainingHours.toString()} hour(s) remaining to
                  respond to this application for renting your vehicle.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  const RentExpires = () => (
    <View style={styles.wrapper2}>
      {finishedRental.length > 0 &&
        finishedRental.map(({ imageUrl }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.container]}
            onPress={() => handleOnPressReview(index)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={{ uri: imageUrl }} />
              <View style={styles.col}>
                <Text style={styles.Message}>
                  As your rental with this vehicle comes to an end, we kindly
                  ask for your valuable review and rating.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  const SubRequestResponseNotif = () => (
    <View style={styles.wrapper2}>
      {subData.length > 0 &&
        subData.map(({ carImage }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.container]}
            onPress={() => handleOnPress2(index)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={{ uri: carImage }} />
              <View style={styles.col}>
                <Text style={styles.Message}>
                  {subData[index].status == "approved"
                    ? subResponseApproved.message
                    : subData[index].status === "expired"
                    ? subExpired.message
                    : ""}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  const VehicleRegResNotif = () => (
    <View style={styles.wrapper2}>
      {vehicleReg.length > 0 &&
        vehicleReg.map(({ imageUrls: { front } }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.container]}
            onPress={() => handleOnPress3(index)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={{ uri: front }} />
              <View style={styles.col}>
                <Text style={styles.Message}>
                  {vehicleReg[index].status === "approved"
                    ? regResponseApproved.message
                    : regResponseDenied.message}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  //run using sideeffect
  useEffect(() => {
    setUser({ ...user, notifCount: 0 });
    updateFields();
  }, [data, finishedRental]);

  useEffect(() => {
    if (isFocused) {
      showLoading();
      getRentingDetails();
      finishedRentals();
      fetchSubData();
      fetchVehicleRegistrationlData();
    }
    hideLoading();
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <RentingRequestNotif />
      <RentExpires />
      <SubRequestResponseNotif />
      <VehicleRegResNotif />
      {finishedRental.length === 0 &&
        data.length === 0 &&
        subData.length === 0 &&
        vehicleReg.length === 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center" }}>No notification found !</Text>
          </View>
        )}
      <LoadingComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -23,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomColor: colors.white[2],
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "flex-start",
    height: "auto",
    alignItems: "center",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "start",
    gap: 10,
    width: "75%",
  },
  Message: {
    fontSize: 15,
    color: colors.white[1],
  },
});

export default NotificationList;
