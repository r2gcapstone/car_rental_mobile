import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { colors } from "constants/Colors";
import useSentenceCase from "hooks/useSentenceCase";
import Text from "components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCars } from "api/cars";

const VehicleList = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const { toSentenceCase } = useSentenceCase();
  const [data, setData] = useState([]);

  const getRegVehicles = async () => {
    try {
      showLoading();
      const result = await getCars();

      if (Array.isArray(result)) {
        setData(result);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      alert(
        "There has been an error fetching renting details, please try again later."
      );
    }
  };

  useEffect(() => {
    getRegVehicles();
  }, []);

  const handleOnPress = () => {};

  return (
    <>
      {data.length > 0 ? (
        data.map(
          (
            {
              imageUrls: { front },
              vehicleDetails: { vehicleName },
              status,
              subscriptionStatus,
              rentee,
            },
            index
          ) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.container,
                index === data.length - 1 && styles.lastItem,
              ]}
              onPress={() => handleOnPress(index)}
            >
              <View style={styles.row}>
                <Image style={styles.img} source={{ uri: front }} />
                <View style={styles.col}>
                  <Text style={styles.carName}>
                    {toSentenceCase(vehicleName)}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Text
                      style={[
                        styles.status,
                        {
                          backgroundColor:
                            status !== "booked" ? "#FF0000" : "#0068C8",
                        },
                      ]}
                    >
                      {status === "booked"
                        ? `${"Booked By : " + rentee}`
                        : toSentenceCase(status)}
                    </Text>
                    <Text
                      style={[
                        styles.status,
                        {
                          backgroundColor:
                            subscriptionStatus !== "subscribed"
                              ? "#526D82"
                              : "#FF5C00",
                        },
                      ]}
                    >
                      {toSentenceCase(subscriptionStatus)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        )
      ) : (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>No vehicle found!</Text>
        </View>
      )}
      <LoadingComponent />
    </>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomColor: colors.white[2],
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
    gap: 6,
    width: "70%",
  },
  col: {
    gap: 2,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: colors.white[1],
    padding: 10,
  },

  statusText: {
    padding: 4,
    paddingHorizontal: 10,
    textAlign: "center",
    flexShrink: 2,
    fontWeight: "500",
  },
  ownerName: {
    fontWeight: "bold",
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
    fontSize: 12,
  },
});
