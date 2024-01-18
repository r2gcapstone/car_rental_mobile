import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import { router } from "expo-router";
//layout
import MainLayout from "layouts/MainLayout";

const AdminMessage = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data) || "";
  const {
    carImage,
    vehicleName,
    status,
    subscriptionType,
    dateCreated,
    adminMessage,
  } = data;

  // Convert the timestamp to milliseconds by adding the seconds and nanoseconds together
  let dateInMilliseconds =
    dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1000000;

  // Create a new Date object
  let date = new Date(dateInMilliseconds);

  // Format the date into a readable string
  let readableDate = date.toLocaleDateString();

  const dataArray = [
    { key: 0, label: "Subscription Purchase Date :", value: readableDate },
    {
      key: 1,
      label: "Type of Subscription : ",
      value: subscriptionType === "MONTHLY" ? "1 Month" : "",
    },
    {
      key: 2,
      label: "Status:",
      value: status === "declined" ? "Rejected" : "",
    },
  ];

  const handleOnPress = () => {
    router.push("/home");
  };

  const MessageComponent = () => (
    <>
      {adminMessage.split("  ").map((line, index) => (
        <Text key={index}>
          {"\n"}
          {line}
        </Text>
      ))}
    </>
  );

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: carImage }} />
          <Text style={styles.h1}>{vehicleName}</Text>
          {dataArray.map(({ key, label, value }) => (
            <View style={styles.row} key={key}>
              <Text style={styles.h2}>{label}</Text>
              <Text
                style={[styles.value, { color: key === 2 ? "red" : "white" }]}
              >
                {value}
              </Text>
            </View>
          ))}

          <View
            style={[
              styles.row,
              {
                marginTop: 20,
                backgroundColor: "#526D82",
                padding: 14,
                paddingTop: -10,
                borderRadius: 14,
                flexDirection: "column",
              },
            ]}
          >
            <MessageComponent />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleOnPress} style={styles.btn}>
        <Text style={styles.btnText}>Okay</Text>
      </TouchableOpacity>
    </MainLayout>
  );
};

export default AdminMessage;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -23,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 5,
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    objectFit: "fill",
    borderColor: "gray",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "red",
    width: "100%",
    borderRadius: 8,
    height: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
});
