import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getRentingDocs } from "api/cars";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { colors } from "constants/Colors";
import useSentenceCase from "hooks/useSentenceCase";
import Text from "components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";

const RentingItem = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const { toSentenceCase } = useSentenceCase();
  const [data, setData] = useState([]);

  const getRentingDetails = async () => {
    try {
      showLoading();
      const result = await getRentingDocs();
      if (Array.isArray(result)) {
        setData(result);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  useEffect(() => {
    getRentingDetails();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        data.map(
          (
            {
              imageUrl,
              dateCreated,
              ownerName,
              vehicleDetails: { vehicleName },
              status,
            },
            index
          ) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.container,
                index === data.length - 1 && styles.lastItem,
              ]}
            >
              <View style={styles.row}>
                <Image style={styles.img} source={{ uri: imageUrl }} />
                <View style={styles.col}>
                  <Text style={styles.carName}>
                    {toSentenceCase(vehicleName)}
                  </Text>
                  <Text style={styles.text}>
                    Application Date : {dateCreated}
                  </Text>
                  <Text style={styles.text}>
                    Vehicle Owner :{" "}
                    <Text style={styles.ownerName}>
                      {" "}
                      {toSentenceCase(ownerName)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text}>Booking status</Text>
                <View style={styles.status}>
                  <Text style={styles.statusText}>
                    {toSentenceCase(status)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        )
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
          <Text style={styles.text}>No Rental Application Found !</Text>
        </View>
      )}
      <LoadingComponent />
    </>
  );
};

export default RentingItem;

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
  row2: {
    flexDirection: "col",
    gap: 6,
    width: "25%",
    alignItems: "center",
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: colors.white[1],
  },
  status: {
    backgroundColor: colors.blue.strongblue,
    borderRadius: 10,
    width: "auto",
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
});
