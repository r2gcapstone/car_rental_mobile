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
import pesoWhite from "assets/icons/pesoWhite.png";

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

import useSentenceCase from "hooks/useSentenceCase";

export default function ResultScreen() {
  const { toSentenceCase } = useSentenceCase();
  const route = useRoute();
  const { result } = route.params;

  const { searchResults } = result;

  // console.log("Search Results: ", searchResults);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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
                  <Text style={styles.carName}>{toSentenceCase(name)}</Text>
                  <Text style={styles.contentText}>
                    owned by:{" "}
                    <Text style={styles.ownerNameText}>
                      {toSentenceCase(ownerName)}
                    </Text>
                  </Text>
                  <Image
                    style={styles.carImage}
                    source={require("assets/images/homeImg2.png")}
                  ></Image>
                  <Text style={styles.priceContainer}>
                    <Image style={styles.pesoIcon} source={pesoWhite}></Image>
                    <Text style={styles.priceText}> {priceRate} </Text>/ day
                  </Text>
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
                    <Text style={styles.contentText}>
                      {toSentenceCase(type)}
                    </Text>
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
                    <Text style={styles.contentText}>
                      {toSentenceCase(gearShift)}
                    </Text>
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
                    <Text style={styles.contentText}>
                      {toSentenceCase(fuelType)}
                    </Text>
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
    gap: 6,
  },
  contentIcon: {
    width: 18,
    height: 18,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.blue.dark,
  },
  backIcon: {
    transform: [{ rotate: "180deg" }],
    height: 20,
    width: 20,
    padding: 2,
  },
  resultContainer: {
    flex: 1,
    width: "100%",
    gap: 11,
  },
  leftContent: {
    flex: 1.3,
    gap: 3,
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
    height: 36,
  },
  ownerNameText: {
    fontWeight: "bold",
  },
  proceedBtn: {
    width: "auto",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.red.primary,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  priceContainer: {
    fontSize: 12,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pesoIcon: {
    width: 12,
    height: 12,
  },
});
