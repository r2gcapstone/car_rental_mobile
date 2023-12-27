import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import { useRoute } from "@react-navigation/native";
import { Subscribe } from "api/subscription";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import useSentenceCase from "hooks/useSentenceCase";
import UploadImageBtn from "components/button/UploadImageBtn";

//layout
import MainLayout from "layouts/MainLayout";
import { router } from "expo-router";

const initialState = {
  receipt: "",
};

const PaymentInfo = () => {
  const route = useRoute();
  const { toSentenceCase } = useSentenceCase();
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const data = JSON.parse(route.params?.data);
  const [receiptImg, setReceiptImg] = useState(initialState);

  const {
    type,
    price,
    value,
    days,
    selectedMethod,
    imageUrls,
    carId,
    ownerNumber,
    ownerUsername,
  } = data;

  const newObject = {
    carId: carId,
    subscriptionType: type,
    ammount: price,
    paymentMethod: selectedMethod,
    ownerNumber: ownerNumber,
    ownerUsername: ownerUsername,
    duration: days,
    vehicleName: value,
    carImage: imageUrls.front,
    status: "pending",
    receiptImg: receiptImg.receipt,
  };

  const handleOnPress = async () => {
    try {
      showLoading();
      const result = await Subscribe(newObject);
      hideLoading();
      if (!result.error) {
        alert("You've successfully send a subscription request!");
        router.push("/");
      }
    } catch (error) {
      hideLoading();
    }
  };

  const card1Array = [
    { id: 1, lable: "Gcash", value: "09162637791" },
    { id: 2, lable: "Paypal", value: "wdotgonzales@gmail.com" },
    { id: 3, lable: "Bank Transfer", value: "4003830171874018" },
  ];

  const card2Array = [
    { id: 1, lable: "Payment Method", value: toSentenceCase(selectedMethod) },
    { id: 2, lable: "Ammount to Pay", value: price + " PHP" },
    { id: 3, lable: "Subscription", value: type },
    { id: 4, lable: "Vehicle", value: value },
  ];

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Payment Info & Payment Details
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.caption}>
              You have to pay the amount with the payment method you use. After
              that upload the receipt of the transaction.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.header2}>
                <Text style={styles.headerText2}>R2G Payment Information</Text>
              </View>
              {card1Array.map((item) => (
                <View key={item.id} style={styles.row2}>
                  <Text style={styles.label}>{item.lable} : </Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.card}>
              <View style={styles.header2}>
                <Text style={styles.headerText2}>Your Payment Details</Text>
              </View>
              {card2Array.map((item) => (
                <View key={item.id} style={styles.row2}>
                  <Text style={styles.label}>{item.lable} : </Text>
                  <Text style={styles.value}>
                    {item.value === "MONTHLY" ? "1 MONTH" : item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* Upload button */}
          <UploadImageBtn
            label="Upload the Receipt of the Payment"
            name="receipt"
            btnProps={{
              backgroundColor: colors.blue.slitedark,
              width: "35%",
            }}
            imageUrl={receiptImg}
            setImageUrl={setReceiptImg}
          />
        </View>
        <TouchableOpacity onPress={handleOnPress} style={styles.btn}>
          <Text style={styles.btnTxt}>Okay</Text>
        </TouchableOpacity>
        <LoadingComponent />
      </ScrollView>
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
    marginBottom: 15,
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
