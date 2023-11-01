import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAllRentals,
  getFinishedRental,
  updateRentalDataField,
} from "api/rental";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useUserContext } from "context/UserContext";

const NotificationList = ({ from }) => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [data, setData] = useState([]);
  const [finishedRental, setFinishedRental] = useState([]);
  const isFocused = useIsFocused();
  const { user, setUser } = useUserContext();

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
    let path = "";
    if (from === "notification") {
      path = "(notification)/booking-information";
    } else {
      path = "rent-my-vehicle/renting-application/booking-information";
    }

    if (data[index]) {
      router.push({
        pathname: path,
        params: { data: JSON.stringify(data[index]), from: from },
      });
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

  //run using sideeffect
  useEffect(() => {
    setUser({ ...user, notifCount: 0 });
    updateFields();
  }, [data, finishedRental]);

  useEffect(() => {
    if (isFocused) {
      getRentingDetails();
      finishedRentals();
    }
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
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
      {finishedRental.length === 0 && data.length === 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center" }}>No notification found !</Text>
        </View>
      )}
      <LoadingComponent />
    </View>
  );
};

export default NotificationList;

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
