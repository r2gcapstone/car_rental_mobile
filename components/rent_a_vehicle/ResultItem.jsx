import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/ThemedText";
import useSentenceCase from "hooks/useSentenceCase";
import { colors } from "constants/Colors";

import ProceedBtn from "../button/ProceedBtn";

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
//hook
import { useUserContext } from "context/UserContext";

const ResultItem = ({ resultItem, dateTime }) => {
  const { user } = useUserContext();
  const { ownerId } = user;

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
  const { toSentenceCase } = useSentenceCase();
  const {
    id,
    userId,
    vehicleDetails,
    imageUrls,
    pickupLocation,
    dropoffLocation,
    ownerName,
    priceRate,
  } = resultItem;

  const newObject = { ...resultItem, dateTime };

  return (
    <View style={styles.rowContent} key={id}>
      {/* Left Content */}
      <View style={styles.leftContent}>
        <Text style={styles.carName}>
          {toSentenceCase(vehicleDetails.vehicleName)}
        </Text>
        <Text style={styles.contentText}>
          owned by:{" "}
          <Text style={styles.ownerNameText}>{toSentenceCase(ownerName)}</Text>
        </Text>
        <Image style={styles.carImage} source={{ uri: imageUrls.front }} />
        <Text style={styles.priceContainer}>
          <Image style={styles.pesoIcon} source={pesoWhite} />
          <Text style={styles.priceText}> {priceRate} </Text>/ day
        </Text>

        <ProceedBtn
          data={newObject}
          disable={userId == ownerId}
          contProps={{
            backgroundColor: colors.red.primary,
            opacity: userId == ownerId ? 0.8 : 1,
          }}
          btnProps={{ fontSize: 12 }}
          btnText={"Apply for Renting"}
          path={"rent-a-vehicle/selected-vehicle"}
        />
      </View>

      {/* Right Content */}
      <View style={styles.rightContent}>
        <View style={styles.wrap}>
          <ContentItem
            icon={iconAssets.car}
            text={toSentenceCase(vehicleDetails.vehicleType)}
          />
          <ContentItem
            icon={iconAssets.user}
            text={vehicleDetails.passengerCount}
          />
          <ContentItem
            icon={iconAssets.baggage}
            text={vehicleDetails.luggageCount}
          />
          <ContentItem
            icon={iconAssets.transmission}
            text={toSentenceCase(vehicleDetails.gearType)}
          />
          <ContentItem icon={iconAssets.payment} text="Payment at Pick-up" />
          <ContentItem
            icon={iconAssets.fuel}
            text={toSentenceCase(vehicleDetails.fuelType)}
          />
        </View>

        <LocationItem
          icon={iconAssets.location}
          headerText="Pick-up Location:"
          locationText={`${pickupLocation.streetName}, ${pickupLocation.municipality.name}, ${pickupLocation.zipCode} ${pickupLocation.province.name}`}
        />
        <LocationItem
          icon={iconAssets.location}
          headerText="Drop-off Location:"
          locationText={`${dropoffLocation.streetName}, ${dropoffLocation.municipality.name}, ${dropoffLocation.zipCode} ${dropoffLocation.province.name}`}
        />
      </View>
    </View>
  );
};

const ContentItem = ({ icon, text }) => (
  <View style={commonStyles.contentContainer}>
    <Image style={commonStyles.contentIcon} source={icon} />
    <Text style={styles.contentText}>{text}</Text>
  </View>
);

const LocationItem = ({ icon, headerText, locationText }) => (
  <View style={styles.locContainer}>
    <Image style={commonStyles.contentIcon} source={icon} />
    <View style={styles.location}>
      <Text style={styles.contentHeader}>{headerText}</Text>
      <Text style={styles.contentText}>{locationText}</Text>
    </View>
  </View>
);

export default ResultItem;

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
  backIcon: {
    transform: [{ rotate: "180deg" }],
    height: 20,
    width: 20,
    padding: 2,
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
    padding: 15,
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
  locContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    paddingRight: "10%",
  },
  location: {
    flexDirection: "column",
  },
  contentHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
});
