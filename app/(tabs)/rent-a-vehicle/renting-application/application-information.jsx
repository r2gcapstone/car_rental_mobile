import { StyleSheet, View, ScrollView, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import useSentenceCase from "hooks/useSentenceCase";
import Text from "components/ThemedText";
import { colors } from "constants/Colors";
//icon
import peso from "assets/icons/pesoWhite.png";
//layout
import MainLayout from "layouts/MainLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

const ApplicationInformation = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const newObject = { ...data };

  const {
    vehicleDetails: { vehicleName },
    imageUrl,
    ownerName,
    status,
    dateTime: { startDate, endDate, startTime, endTime },
    pickupLocation,
    dropoffLocation,
    paymentMethod,
    rentDuration,
    priceRate,
    destination,
    totalPayment,
  } = newObject;

  const p = { ...pickupLocation };
  const d = { ...dropoffLocation };
  const pickUp = `${p.streetName}, ${p.houseNumber}, ${p.barangay.name}, ${p.municipality.name}, ${p.zipCode} ${p.province.name}`;
  const dropOff = `${d.streetName}, ${d.houseNumber}, ${d.barangay.name}, ${d.municipality.name}, ${d.zipCode} ${d.province.name}`;

  const dataArray = [
    { id: 1, label: "Booking Status :", value: toSentenceCase(status) },
    { id: 2, label: "Start Rent Date :", value: startDate },
    { id: 3, label: "Start Rent Time :", value: startTime },
    { id: 4, label: "End Rent Date :", value: endDate },
    { id: 5, label: "End Rent Time : ", value: endTime },
    { id: 6, label: "Pick-up Location :", value: toSentenceCase(pickUp) },
    { id: 7, label: "Drop-off Location :", value: toSentenceCase(dropOff) },
    {
      id: 8,
      label: "Method of Payment :",
      value: toSentenceCase(paymentMethod),
    },
    { id: 9, label: "Rent Duration :", value: `${rentDuration} Day(s)` },
    { id: 10, label: "Price Rate (Per Day) :", value: priceRate },
    {
      id: 11,
      label: "Outside of Origin Location :",
      value: toSentenceCase(destination.municipality),
    },
    {
      id: 12,
      label: "Outside of Origin Rate :",
      value: destination.rate.toString(),
    },
  ];

  const handleOnPress = () => {};

  const options = [
    {
      id: 1,
      label: "pending",
      value: "Cancel Application",
      bgColor: colors.red.primary,
    },
    {
      id: 2,
      label: "approved",
      value: "Turn On Location",
      bgColor: colors.green.primary,
    },
    {
      id: 3,
      label: "declined",
      value: "Delete Booking",
      bgColor: colors.red.primary,
    },
    {
      id: 4,
      label: "finished",
      value: "Delete Booking",
      bgColor: colors.red.primary,
      textColor: colors.textColor.dark,
    },
  ];

  const textColor = (value) => {
    let color = "";
    if (value === "approved") {
      color = colors.green.primary;
    } else if (value === "pending") {
      color = "#06F";
    } else if (value === "declined") {
      color = colors.red.primary;
    } else {
      color = colors.white[0];
    }
    return color;
  };

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.carInfo}>
          <View>
            <Text style={styles.carName}>{toSentenceCase(vehicleName)}</Text>
            <Text style={styles.label}>
              Vehicle Owner :{" "}
              <Text style={styles.value}>{toSentenceCase(ownerName)}</Text>
            </Text>
          </View>
          {options.map(
            (option) =>
              status == option.label && (
                <TouchableOpacity
                  onPress={() => handleOnPress(status)}
                  key={option.id}
                  style={[styles.btn, { backgroundColor: option.bgColor }]}
                >
                  <Text style={styles.btnText}>{option.value}</Text>
                </TouchableOpacity>
              )
          )}
        </View>
        <View style={styles.rentingInfo}>
          {dataArray.map(
            (item) =>
              item.value && (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.label}>{item.label}</Text>
                  {item.label === "Booking Status :" ? (
                    <View style={styles.valueContainer}>
                      <Text
                        style={[
                          styles.value,
                          {
                            color: textColor(status),
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        {item.value}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.valueContainer}>
                      {[10, 12].includes(item.id) && (
                        <Image style={styles.icon} source={peso} />
                      )}
                      <Text style={styles.value}>{item.value}</Text>
                    </View>
                  )}
                </View>
              )
          )}
          <View style={[styles.row, styles.totalContent]}>
            <Text style={styles.totalLabel}>Total Amount :</Text>
            <View style={styles.valueContainer}>
              <Image style={styles.icon} source={peso} />
              <Text style={styles.totalValue}>{totalPayment}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ApplicationInformation;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  imageContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  carInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#757575",
    alignSelf: "center",
  },
  carName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  btn: {
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  rentingInfo: {
    flex: 1,
    width: "100%",
    gap: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    width: "100%",
  },
  totalContent: {
    marginTop: 10,
  },
  totalValue: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  icon: {
    width: 10,
    height: 12,
    marginRight: 6,
  },
});
