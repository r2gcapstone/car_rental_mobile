import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Text from "components/ThemedText";
import { getAllRentals } from "api/rental";
import React, { useEffect, useState } from "react";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import useSentenceCase from "hooks/useSentenceCase";
import { colors } from "constants/Colors";
import { router } from "expo-router";

const ApplicantsList = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const { toSentenceCase } = useSentenceCase();
  const [data, setData] = useState([]);

  const getRentals = async () => {
    try {
      showLoading();
      const result = await getAllRentals();
      if (Array.isArray(result)) {
        setData(result);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      alert(
        "There has been an error fetching Rental Applications , please try again later."
      );
    }
  };

  const handleOnPress = (index) => {
    if (data[index]) {
      router.push({
        pathname: "rent-my-vehicle/renting-application/booking-information",
        params: { data: JSON.stringify(data[index]) },
      });
    } else {
      router.push("rent-my-vehicle/renting-application/booking-information");
    }
  };

  useEffect(() => {
    getRentals();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {data.map(({ rentee, imageUrl, dateCreated }, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.container,
            index === data.length - 1 && styles.lastItem,
          ]}
          onPress={() => handleOnPress(index)}
        >
          <View style={styles.row}>
            <View style={styles.col}>
              <Image style={styles.img} source={{ uri: imageUrl }} />
              <View style={styles.textContainer}>
                <Text style={styles.renteeName}>{toSentenceCase(rentee)}</Text>
                <Text style={styles.text}>Wants to rent your vehicle !</Text>
              </View>
            </View>
            <View style={styles.col2}>
              <Text style={styles.dateText}>{dateCreated.toString()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <LoadingComponent />
    </View>
  );
};

export default ApplicantsList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: colors.white[2],
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "flex-start",
    height: "auto",
  },
  row: {
    flex: 1,
    flexBasis: 1,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
  },
  col2: {
    alignSelf: "flex-end",
  },
  textContainer: {
    alignSelf: "center",
    width: "70%",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  renteeName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
  },
  text: {},
});
