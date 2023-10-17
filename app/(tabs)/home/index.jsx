import { StyleSheet, Image, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { getRentingDocs } from "../../../api/rental";
//layout
import MainLayout from "layouts/MainLayout";
// Components
import Text from "components/ThemedText";
import Header from "components/home/Header";
import { useLocationContext } from "context/LocationContext";
import { colors } from "constants/Colors";

export default function Homepage() {
  const { setIsTracking, setDocIds } = useLocationContext();
  const fetchTrackingStatus = async () => {
    try {
      const result = await getRentingDocs();
      if (result && Array.isArray(result)) {
        const hasOnStatus = result.some(
          (item) => item.location.status === "on"
        );
        setIsTracking(hasOnStatus);
        result.forEach((item) => {
          if (item.location.status === "on") {
            setDocIds((prevDocIds) => {
              if (!prevDocIds.includes(item.docId)) {
                return [...prevDocIds, item.docId];
              }
              return prevDocIds;
            });
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTrackingStatus();
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.row}>
          <View style={styles.introContaner}>
            <Image
              source={require("assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Welcome to R2G</Text>
          </View>

          <Text style={styles.text}>
            Car renters and owners! Our mobile application offers a seamless and
            secure way for individuals to rent and advertise their vehicles.{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require("assets/images/homeImg1.png")}
            style={styles.Img1}
          />

          <Text style={styles.titleText}>Track Your vehicle</Text>
          <Text style={styles.text}>
            Car renters and owners! Our mobile application offers a seamless and
            secure way for individuals to rent and advertise their vehicles.{" "}
          </Text>
        </View>
        <View style={styles.row3}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Vehicle Preference</Text>
            <Text style={styles.text}>
              With R2G, car renters can easily find a wide range of vehicles
              that match their preference and budget with the use of R2G filter
              feature.
            </Text>
          </View>

          <Image
            source={require("assets/images/homeImg2.png")}
            style={styles.Img2}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  row: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    padding: 17,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  introContaner: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  row3: {
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 23,
    padding: 17,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.blue.slitedark,
  },
  logoText: {
    fontSize: 25,
    marginTop: 5,
  },
  logo: {
    height: 52,
    width: 43,
  },
  Img1: {
    flex: 1,
    height: 104,
    width: "115%",
    top: -30,
    marginBottom: -30,
    resizeMode: "stretch",
  },
  Img2: {
    height: "145%",
    width: "40%",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  textContainer: {
    width: "60%",
    gap: 23,
    alignItems: "center",
    backgroundColor: colors.blue.slitedark,
  },
  text: {
    textAlign: "left",
  },
});
