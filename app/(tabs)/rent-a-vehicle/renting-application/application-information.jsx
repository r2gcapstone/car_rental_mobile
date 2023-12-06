import { StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import useSentenceCase from "hooks/useSentenceCase";
import Text from "components/ThemedText";
import ConfirmationModal from "components/modal/ConfirmationModal";
import { deleteRentRequest } from "api/rental";
import formatDate2 from "utils/formatDate2";
import formatTime2 from "utils/formatTime2";
import appendAddress from "utils/appendAddress";
import firebaseTimestamp from "utils/FirebaseTimestamp";
//context
import { useLocationContext } from "context/LocationContext";
import { updateRentalData } from "api/rental";
//icon
import peso from "assets/icons/pesoWhite.png";
//layout
import MainLayout from "layouts/MainLayout";
import { router } from "expo-router";

const ApplicationInformation = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { toSentenceCase } = useSentenceCase();
  const newObject = { ...data };
  const [modal, setModal] = useState(false);
  const { setIsTracking, isTracking, location, setDocIds, docIds } =
    useLocationContext();

  const onClose = () => {
    setModal((prev) => !prev);
  };

  const {
    vehicleDetails: { vehicleName },
    imageUrl,
    ownersNumber,
    ownerName,
    status,
    dateTime,
    pickupLocation,
    dropoffLocation,
    paymentMethod,
    rentDuration,
    priceRate,
    destination,
    totalPayment,
  } = newObject;

  //format date back to firebase timeStamp
  const convertedData = firebaseTimestamp(dateTime);

  const p = { ...pickupLocation };
  const d = { ...dropoffLocation };
  const pickUp = appendAddress(p);
  const dropOff = appendAddress(d);

  // //convert to javascript date for ui
  let startDate = formatDate2(convertedData.startDate.toDate());
  let startTime = formatTime2(convertedData.startTime.toDate());
  let endDate = formatDate2(convertedData.endDate.toDate());
  let endTime = formatTime2(convertedData.endTime.toDate());

  const dataArray = [
    { id: 0, label: "Booking Status :", value: toSentenceCase(status) },
    {
      id: 1,
      label: "Mobile Number :",
      value: ownersNumber ? ownersNumber : "none",
    },
    { id: 2, label: "Start Rent Date :", value: startDate },
    { id: 3, label: "Start Rent Time :", value: startTime },
    { id: 4, label: "End Rent Date :", value: endDate },
    { id: 5, label: "End Rent Time : ", value: endTime },
    { id: 6, label: "Pick-up Location :", value: toSentenceCase(pickUp) },
    { id: 7, label: "Drop-off Location :", value: toSentenceCase(dropOff) },
    {
      id: 8,
      label: "Method of Payment :",
      value: paymentMethod,
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
      label: "Outside of Origin(Add-on cost) :",
      value: destination.rate.toString(),
    },
  ];

  const handleOnPress = async (status) => {
    if (status === "approved") {
      onClose();
    } else if (status === "pending") {
      onClose();
    } else {
      const result = await deleteRentRequest(data.id);
      if (result.status === "success") {
        router.push("/");
      }
    }
  };

  const handleOkayBtn = async () => {
    //handle cancelation and GPS location
    if (status === "pending") {
      const result = await deleteRentRequest(data.id);
      if (result.status === "success") {
        router.push("/");
      }
    } else if (status === "approved") {
      setIsTracking((prev) => !prev);
      setModal((prev) => !prev);
      setDocIds((prevDocIds) => {
        if (!prevDocIds.includes(data.docId)) {
          return [...prevDocIds, data.docId];
        }
        return prevDocIds;
      });

      if (isTracking && docIds.includes(data.docId)) {
        setDocIds((prevDocIds) => prevDocIds.filter((id) => id !== data.docId));
        await updateRentalData({ ...location, status: "off" }, data.docId);
      }
    }
  };

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
      value:
        isTracking && docIds.includes(data.docId)
          ? "Turn Off Location"
          : "Turn On Location",
      bgColor:
        isTracking && docIds.includes(data.docId)
          ? colors.red.primary
          : colors.green.primary,
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
      {status === "approved" && modal && (
        <ConfirmationModal
          caption={() =>
            isTracking && docIds.includes(data.docId) ? (
              <Text style={styles.captionText}>
                This will turn off the location tracker in your device
              </Text>
            ) : (
              <Text style={styles.captionText}>
                This will use the location of your device as GPS Tracker for the
                vehicle
              </Text>
            )
          }
          onClose={onClose}
          btn1Text="Okay"
          btn2Text="No"
          btn1Props={{
            backgroundColor:
              isTracking && docIds.includes(data.docId)
                ? colors.red.primary
                : colors.green.primary,
            borderColor: "#fff",
            borderWidth: 1,
          }}
          handleOkayBtn={handleOkayBtn}
        />
      )}
      {status === "pending" && modal && (
        <ConfirmationModal
          caption={() => (
            <View style={styles.caption}>
              <Text style={styles.captionText}>
                This will cancel your booking
              </Text>
              <Text style={[styles.captionText, { fontWeight: "bold" }]}>
                Are you sure?
              </Text>
            </View>
          )}
          onClose={onClose}
          btn1Text="Yes"
          btn2Text="No"
          btn1Props={{
            backgroundColor: colors.red.primary,
          }}
          handleOkayBtn={handleOkayBtn}
        />
      )}
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
    minWidth: "40%",
    alignItems: "center",
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
});
