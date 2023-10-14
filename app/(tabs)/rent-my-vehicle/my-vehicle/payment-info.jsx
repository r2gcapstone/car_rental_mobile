import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import { useRoute } from "@react-navigation/native";
import { Subscribe } from "api/subscription";
import formatdate from "utils/formatDate";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import useSentenceCase from "hooks/useSentenceCase";

//layout
import MainLayout from "layouts/MainLayout";
import { router } from "expo-router";

const PaymentInfo = () => {
  const route = useRoute();
  const date = formatdate(new Date());
  const { toSentenceCase } = useSentenceCase();
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const data = JSON.parse(route.params?.data);
  const { type, price, value, days, wallet, gcashNumber, imageUrls, carId } =
    data;

  const newObject = {
    carId: carId,
    subscriptionType: type,
    ammount: price,
    paymentMethod: wallet,
    walletNumber: gcashNumber,
    duration: days,
    vehicleName: value,
    carImage: imageUrls.front,
    dateCreated: date,
    status: "pending",
  };

  const handleOnPress = async () => {
    try {
      showLoading();
      const result = await Subscribe(newObject);
      hideLoading();
      if (!result.error) {
        router.push("/");
      }
    } catch (error) {
      hideLoading();
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Follow the instructions below</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.caption}>
            Please make the payment for the selected subscription by using the
            provided payment method. Kindly send the payment to the given mobile
            number.
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.header2}>
              <Text style={styles.headerText2}>
                Follow the instructions below
              </Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.label}>Amount to Pay : </Text>
              <Text style={styles.value}>{price + " PHP"}</Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.label}>Payment Method : </Text>
              <Text style={styles.value}>{toSentenceCase(wallet)}</Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.label}>Mobile Number :</Text>
              <Text style={styles.value}>{gcashNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.caption}>
            You will be given <Text style={{ fontWeight: "bold" }}>1 day</Text>{" "}
            to comply.
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleOnPress} style={styles.btn}>
        <Text style={styles.btnTxt}>Okay</Text>
      </TouchableOpacity>
      <LoadingComponent />
    </MainLayout>
  );
};

export default PaymentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header2: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingBottom: 10,
    marginBottom: 4,
  },
  headerText2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
  },
  card: {
    backgroundColor: "#526D82",
    padding: 20,
    borderRadius: 10,
    gap: 8,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 40,
    backgroundColor: colors.blue.slitedark,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
