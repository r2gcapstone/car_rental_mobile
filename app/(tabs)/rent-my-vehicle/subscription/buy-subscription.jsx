import { StyleSheet, View, ScrollView, Image } from "react-native";
import React from "react";
import Text from "components/ThemedText";
//layout
import MainLayout from "layouts/MainLayout";
import { TouchableOpacity } from "react-native";
import peso from "assets/icons/pesoWhite.png";
import { router } from "expo-router";

const BuySubscription = () => {
  const dataArray = [
    {
      id: 1,
      label: "MONTHLY",
      price: "200",
      bg: "#526D82",
      caption:
        "Increase the exposure of your vehicle to potential renters for a duration of one month. Maximize your chances of securing rental bookings and generating income.",
    },
    {
      id: 2,
      label: "3 MONTHS",
      price: "550",
      bg: "#3E5A81",
      caption:
        "Extend the visibility of your vehicle for a period of three months. Benefit from an extended promotional period, allowing more users to discover and consider renting your vehicle.",
    },
    {
      id: 3,
      label: "6 MONTHS",
      price: "999",
      bg: "#BC2D00",
      caption:
        "Opt for a six-month subscription to significantly boost the visibility of your vehicle. With an extended duration, you can attract a larger audience of potential renters and enhance your rental opportunities",
    },
    {
      id: 4,
      label: "1 YEAR",
      price: "1800",
      bg: "#C89000",
      caption:
        "Maximize the visibility of your vehicle throughout the year with this comprehensive subscription package. Enjoy continuous promotion and exposure.",
    },
  ];

  const handleOnPress = (label, price) => {
    router.push({
      pathname: "rent-my-vehicle/subscription/choose-vehicle",
      params: { data: { label: label, price: price } },
    });
  };
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {dataArray.map(({ id, label, price, caption, bg }) => (
            <View key={id} style={[styles.card, { backgroundColor: bg }]}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.imgContainer}>
                <Image style={styles.icon} source={peso} />
                <Text style={styles.price}>{price}</Text>
              </View>

              <Text style={styles.caption}>{caption}</Text>
              <TouchableOpacity
                onPress={() => handleOnPress(label, price)}
                style={styles.btn}
              >
                <Text style={styles.btnTxt}>Continue</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.row}></View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default BuySubscription;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -24,
    width: "100%",
  },
  container: {
    flex: 1,
    gap: 20,
    marginTop: 20,
  },
  card: {
    padding: 30,
    paddingVertical: 40,
    gap: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  caption: {
    textAlign: "center",
    fontSize: 16,
  },
  btn: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },
  btnTxt: {
    fontSize: 20,
    color: "#000",
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 20,
  },
  price: {
    fontSize: 80,
  },
  icon: {
    height: 55,
    width: 50,
    padding: 2,
    marginTop: 8,
  },
});
