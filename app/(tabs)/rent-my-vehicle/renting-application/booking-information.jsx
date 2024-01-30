import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import useSentenceCase from "hooks/useSentenceCase";
import Text from "components/ThemedText";
import ConfirmationModal from "components/modal/ConfirmationModal";
import { getUserData } from "api/user";
import { rentalRequest } from "api/rental";
import formatDate from "utils/formatDate";
import formatTime from "utils/formatTime";
import { Timestamp } from "firebase/firestore";
import appendAddress from "utils/appendAddress";
import firebaseTimestamp from "utils/FirebaseTimestamp";

//icon
import peso from "assets/icons/pesoWhite.png";
//layout
import MainLayout from "layouts/MainLayout";
import { router } from "expo-router";

const BookingInformation = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const from = route.params?.from;
  const { toSentenceCase } = useSentenceCase();
  const newObject = { ...data };
  const [modal, setModal] = useState(false);
  const [renteeData, setRenteeData] = useState({});
  const [choice, setChoice] = useState("");

  const onClose = (value) => {
    setChoice(value);
    setModal((prev) => !prev);
  };

  const {
    vehicleDetails: { vehicleName },
    imageUrl,
    dateTime,
    pickupLocation,
    dropoffLocation,
    paymentMethod,
    rentDuration,
    priceRate,
    destination,
    totalPayment,
    userId,
    docId,
    carId,
    distance,
  } = newObject;

  const renteeId = userId;

  const convertedDateTime = {
    startDate: Timestamp.fromDate(new Date(dateTime.startDate.seconds * 1000)),
    startTime: Timestamp.fromDate(new Date(dateTime.startTime.seconds * 1000)),
    endDate: Timestamp.fromDate(new Date(dateTime.endDate.seconds * 1000)),
    endTime: Timestamp.fromDate(new Date(dateTime.endTime.seconds * 1000)),
  };

  const p = { ...pickupLocation };
  const d = { ...dropoffLocation };
  const pickUp = appendAddress(p);
  const dropOff = appendAddress(d);

  const dataArray = [
    { id: 1, label: "Vehicle to Rent :", value: toSentenceCase(vehicleName) },
    {
      id: 2,
      label: "Pick-up Date :",
      value: formatDate(convertedDateTime.startDate),
    },
    {
      id: 3,
      label: "Pick-up Time :",
      value: formatTime(convertedDateTime.startTime),
    },
    {
      id: 4,
      label: "Drop-off Date :",
      value: formatDate(convertedDateTime.endDate),
    },
    {
      id: 5,
      label: "End Rent Time : ",
      value: formatTime(convertedDateTime.endTime),
    },
    { id: 6, label: "Pick-up Location :", value: toSentenceCase(pickUp) },
    { id: 7, label: "Drop-off Location :", value: toSentenceCase(dropOff) },
    {
      id: 8,
      label: "Price Rate (Per Day) :",
      value: priceRate && priceRate.toLocaleString(),
    },
    {
      id: 9,
      label: "Method of Payment :",
      value: paymentMethod,
    },
    { id: 10, label: "Rent Duration :", value: `${rentDuration} Day(s)` },

    {
      id: 11,
      label: "Destination(City) :",
      value: toSentenceCase(destination.municipality.name),
    },
    {
      id: 12,
      label: "Distance between cities :",
      value: distance + " " + "km",
    },
  ];

  const handleOkayBtn = async (choice, docId, carId) => {
    console.log(choice, docId, carId);
    let path = "";
    if (from === "notification") {
      path = "(notification)/success-screen";
    } else {
      path = "rent-my-vehicle/renting-application/success-screen";
    }

    if (choice === "approve") {
      try {
        const result = await rentalRequest(docId, "approved", carId);
        console.log(result);
        router.push({
          pathname: path,
          params: { choice, from },
        });
      } catch (error) {
        router.push({
          pathname: path,
          params: { choice, from },
        });
      }
    } else {
      try {
        await rentalRequest(docId, "declined");
        router.push({
          pathname: path,
          params: { choice, from },
        });
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const fetchRenteeData = async (renteeId) => {
    try {
      const result = await getUserData(renteeId);
      if (!result.error) {
        setRenteeData(result);
      }
    } catch (error) {
      alert("An error occured when fetching data, please try again later !");
    }
  };

  const { firstName, lastName, address, email, mobileNumber } = renteeData;

  let newAddress = "";
  if (address) {
    newAddress = [
      address.street,
      address.subdivision,
      address.barangay.name,
      address.municipality.name,
      `${address.zipCode} ${address.province.name}`,
    ]
      .filter(Boolean)
      .join(", ");
  }

  const applicantArray = [
    { id: 0, label: "Full Name :", value: firstName + " " + lastName },
    { id: 1, label: "Address :", value: newAddress && newAddress },
    { id: 2, label: "Email :", value: email },
    { id: 3, label: "Mobile Number :", value: mobileNumber },
  ];

  useEffect(() => {
    fetchRenteeData(renteeId);
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Renting Information</Text>
        </View>
        <View style={styles.rentingInfo}>
          {dataArray.map(
            (item) =>
              item.value && (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.label}>{item.label}</Text>
                  <View style={styles.valueContainer}>
                    {[10].includes(item.id) && (
                      <Image style={styles.icon} source={peso} />
                    )}
                    <Text style={styles.value}>{item.value}</Text>
                  </View>
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
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Applicant Information</Text>
        </View>
        <View style={styles.rentingInfo}>
          {renteeData &&
            applicantArray.map(({ id, label, value }) => (
              <View key={id} style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{toSentenceCase(value)}</Text>
                </View>
              </View>
            ))}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => onClose("approve")}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Appove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onClose("decline")}
            style={[
              styles.btn,
              { backgroundColor: colors.red.primary, opacity: 0.5 },
            ]}
          >
            <Text style={styles.btnText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {modal && (
        <ConfirmationModal
          caption={() => (
            <Text style={{}}>
              Are you sure you want to{" "}
              <Text
                style={{
                  color: choice === "approve" ? "#0029FF" : colors.red.primary,
                }}
              >
                {choice}
              </Text>{" "}
              ?
            </Text>
          )}
          onClose={onClose}
          btn1Text="Yes"
          btn2Text="No"
          btn1TextProps={{ color: "#000", fontWeight: "bold" }}
          btn2TextProps={{ color: "#000", fontWeight: "bold" }}
          btn1Props={{
            backgroundColor: "#D9D9D9",
            color: "#000",
          }}
          btn2Props={{
            backgroundColor: "#D9D9D9",
            color: "#000",
          }}
          handleOkayBtn={() => handleOkayBtn(choice, docId, carId)}
        />
      )}
    </MainLayout>
  );
};

export default BookingInformation;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  header: {
    fontSize: 18,
  },
  imageContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#757575",
    alignSelf: "center",
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
  caption: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  captionText: {
    textAlign: "center",
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
  },
  btn: {
    width: "48%",
    flexGrow: 1,
    height: 40,
    backgroundColor: colors.blue.strongblue,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
