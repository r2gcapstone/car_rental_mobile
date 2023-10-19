import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllRentals } from "api/rental";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const NotificationList = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [data, setData] = useState([]);

  const getRentingDetails = async () => {
    try {
      showLoading();
      const result = await getAllRentals();
      if (Array.isArray(result)) {
        setData(result);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      alert("There has been an error fetching Rental Notification.");
    }
  };

  const handleOnPress = (index) => {
    if (data[index]) {
      router.push({
        pathname: "rent-a-vehicle/renting-application/application-information",
        params: { data: JSON.stringify(data[index]) },
      });
    } else {
      router.push("rent-a-vehicle/renting-application/application-information");
    }
  };

  useEffect(() => {
    getRentingDetails();
  }, []);

  return (
    <View style={styles.wrapper}>
      {data.length > 0 ? (
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
        ))
      ) : (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            margin: "auto",
            height: "auto",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No Notification Found !
          </Text>
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
