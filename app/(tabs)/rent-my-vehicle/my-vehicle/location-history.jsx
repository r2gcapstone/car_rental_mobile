import { StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
// import { getLocationHistory } from "api/location";
import * as Location from "expo-location";

import { useLoadingAnimation } from "hooks/useLoadingAnimation";
//icon
import peso from "assets/icons/pesoWhite.png";
import history from "assets/images/history.png";

//layout
import MainLayout from "layouts/MainLayout";

const LocationHistory = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const { locationHistory } = data;

  const mappedArray = locationHistory.map((item) => {
    const innerArray = [
      {
        key: 0,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      },
      {
        key: 1,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      },
      {
        key: 2,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      },
      {
        key: 3,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      },
      {
        key: 4,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      },
    ];

    return innerArray;
  });

  const reverseGeocode = async (lat, long) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let result = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: long,
      });
      return result[0];
    } catch (e) {
      console.log(e);
    }
  };

  mappedArray &&
    reverseGeocode(11.4579207, 123.1284525)
      .then((address) => console.log(address))
      .catch((error) => console.error(error));

  // console.log(JSON.stringify(mappedArray, null, 2));

  // useEffect(() => {
  //   reverseGeocode(mappedArray);
  // }, [mappedArray]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Location History</Text>
        </View>
        <Text style={styles.text}>
          This will display the last five locations of the vehicle.
        </Text>

        {/* <View style={styles.headerContaniner}>
          <View style={styles.textContainer}>
            {locationHistory.map((item) => (
              <Text key={item.timestamp}>{item.timestamp}</Text>
            ))}
          </View>
        </View> */}
        <View style={styles.locContainer}>
          <View style={[styles.col, styles.col1]}>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
          </View>
          <View style={styles.col}>
            <Image style={styles.image} source={history} />
          </View>
          <View style={[styles.col, styles.col2]}>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                Brgy. Axe, Bacolod City, Negros Occidental, Philipppines.
              </Text>
              <Text style={styles.date}>12/11/2023 6:10 AM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: -23,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContaniner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: -70,
  },
  locContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    marginTop: 50,
    minHeight: 600,
    height: "100%",
  },
  col: {
    width: "33%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  col1: { justifyContent: "space-evenly", marginTop: "25%" },
  col2: { justifyContent: "space-evenly", marginTop: "-20%" },
  image: {
    width: 180,
    height: "100%",
    resizeMode: "contain",
  },
  rowData: {
    flexDirection: "column",
    gap: 3,
    textAlign: "center",
  },
  date: {
    fontStyle: "italic",
    fontSize: 10,
  },
});

export default LocationHistory;
