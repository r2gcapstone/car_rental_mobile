import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import { colors } from "constants/Colors";

//Icons
import arrow from "assets/icons/arrow.png";
import logo from "assets/icons/logo.png";
import carIcon from "assets/icons/car.png";
import userIcon from "assets/icons/user.png";
import baggageIcon from "assets/icons/baggage.png";
import transmissionIcon from "assets/icons/transmission.png";
import paymentIcon from "assets/icons/payment.png";
import fuelIcon from "assets/icons/fuel.png";
import locationIcon from "assets/icons/location.png";

const iconAssets = {
  car: carIcon,
  user: userIcon,
  baggage: baggageIcon,
  transmission: transmissionIcon,
  payment: paymentIcon,
  fuel: fuelIcon,
  location: locationIcon,
  arrow: arrow,
  logo: logo,
};

export default function ResultScreen() {
  const route = useRoute();
  const { result } = route.params;

  const { searchResults } = result;

  console.log("Search Results: ", searchResults);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btn} onPress={router.back}>
            <Image style={styles.backIcon} source={iconAssets.arrow}></Image>
          </TouchableOpacity>
          <Text style={styles.headerText}>Result</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Available Vehicle’s For Rent</Text>
          <Image style={styles.logoIcon} source={iconAssets.logo}></Image>
        </View>

        <View style={styles.resultContainer}>
          {searchResults.map(
            ({
              id,
              name,
              ownerName,
              priceRate,
              type,
              passengerCount,
              luggageCount,
              gearShift,
              fuelType,
            }) => (
              <View style={styles.rowContent} key={id}>
                <View style={styles.leftContent}>
                  <Text style={styles.carName}>{name}</Text>
                  <Text style={styles.contentText}>
                    owned by:{" "}
                    <Text style={styles.ownerNameText}>{ownerName}</Text>
                  </Text>
                  <Image
                    style={styles.carImages}
                    source={require("assets/images/homeImg2.png")}
                  ></Image>
                  <Text style={styles.contentText}> P {priceRate} / day</Text>
                  <TouchableOpacity>
                    <Text style={styles.proceedBtn}>Apply for Renting</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightContent}>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.car}
                    />
                    <Text style={styles.contentText}>{type}</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.user}
                    />
                    <Text style={styles.contentText}>{passengerCount}</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.baggage}
                    />
                    <Text style={styles.contentText}>{luggageCount}</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.transmission}
                    />
                    <Text style={styles.contentText}>{gearShift}</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.payment}
                    />
                    <Text style={styles.contentText}>Payment at Pick-up</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.fuel}
                    />
                    <Text style={styles.contentText}>{fuelType}</Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.location}
                    />
                    <Text style={styles.contentText}>Pick-up Location: </Text>
                  </View>
                  <View style={commonStyles.contentContainer}>
                    <Image
                      style={commonStyles.contentIcon}
                      source={iconAssets.location}
                    />
                    <Text style={styles.contentText}>Drop-off Location: </Text>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const commonStyles = {
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contentIcon: {
    width: 18,
    height: 18,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: colors.blue.dark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  backIcon: {
    transform: [{ rotate: "180deg" }],
    height: 20,
    width: 20,
    padding: 2,
  },
  headerText: {
    fontSize: 21,
  },
  resultContainer: {
    flex: 1,
    width: "100%",
    gap: 11,
  },
  leftContent: {
    flex: 1.3,
    gap: 2,
  },
  rightContent: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    alignItems: "flex-start",
  },
  contentText: {
    fontSize: 12,
  },
  rowContent: {
    width: "100%",
    flexDirection: "row",
    height: "auto",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.blue.slitedark,
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contentIcon: {
    width: 18,
    height: 18,
  },
  title: {
    fontSize: 21,
    paddingBottom: 10,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  logoIcon: {
    width: 30,
    height: 35,
  },
  ownerNameText: {
    fontWeight: "bold",
  },
  proceedBtn: {
    width: "auto",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.blue.dark,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carImages: {
    width: 100,
    height: 100,
  },
});
