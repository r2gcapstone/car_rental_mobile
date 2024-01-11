import { StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import * as Location from "expo-location";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
//icon
import history from "assets/images/history.png";

//layout
import MainLayout from "layouts/MainLayout";

const LocationHistory = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [results, setResults] = useState([]);

  const { locationHistory } = data;

  let newArray = [];
  try {
    newArray = locationHistory.slice(0, 5).map((item, index) => {
      return {
        key: index,
        date: item.timestamp,
        coords: {
          latitude: item.coords.latitude,
          longitude: item.coords.longitude,
        },
      };
    });
  } catch (error) {
    console.log(error);
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const processArray = async (array) => {
    let tempResults = [];
    let counter = 0; // Initialize a counter variable

    for (const item of array) {
      if (counter >= 5) {
        break; // Exit the loop if the counter exceeds 5
      }

      try {
        const address = await reverseGeocode(
          item.coords.latitude,
          item.coords.longitude
        );
        tempResults.push(address);
      } catch (error) {
        console.error(error);
      }

      counter++; // Increment the counter
      await delay(100);
    }

    setResults(tempResults);
  };

  const joinAddress = (addressObject) => {
    const addressComponents = [
      addressObject.street,
      addressObject.streetNumber,
      addressObject.district,
      addressObject.city,
      addressObject.region,
      addressObject.postalCode,
    ];

    // Filter out null or undefined values
    const filteredAddressComponents = addressComponents.filter(Boolean);

    // Join the filtered components with a comma and space
    const joinedAddress = filteredAddressComponents.join(", ");

    return joinedAddress;
  };

  // Apply the joinAddress function to each object in the finalData array
  const formattedAddresses = results.map(joinAddress).slice(0, 5);

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      await processArray(newArray);
      hideLoading();
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Location History</Text>
        </View>
        <Text style={styles.text}>
          This will display the last five locations of the vehicle.
        </Text>
        <View style={styles.locContainer}>
          <View style={[styles.col, styles.col1]}>
            <View style={styles.rowData}>
              <Text style={styles.location}>{formattedAddresses[3]}</Text>
              <Text style={styles.date}>{newArray[3].date}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                <Text style={styles.location}>{formattedAddresses[1]}</Text>
              </Text>
              <Text style={styles.date}>{newArray[1].date}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={[styles.location, { top: -20, fontWeight: "bold" }]}>
                START
              </Text>
            </View>
          </View>
          <View style={styles.col}>
            <Image style={styles.image} source={history} />
          </View>
          <View style={[styles.col, styles.col2]}>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                <Text style={styles.location}>{formattedAddresses[4]}</Text>
              </Text>
              <Text style={styles.date}>{newArray[4].date}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                <Text style={styles.location}>{formattedAddresses[2]}</Text>
              </Text>
              <Text style={styles.date}>{newArray[2].date}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.location}>
                <Text style={styles.location}>{formattedAddresses[0]}</Text>
              </Text>
              <Text style={styles.date}>{newArray[0].date}</Text>
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
    justifyContent: "space-between",
    gap: 1,
    marginTop: 50,
    minHeight: 600,
    height: "100%",
  },
  col: {
    width: "30%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  col1: {
    justifyContent: "space-evenly",
    marginTop: "25%",
  },
  col2: {
    justifyContent: "space-evenly",
    marginTop: "-20%",
  },
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
