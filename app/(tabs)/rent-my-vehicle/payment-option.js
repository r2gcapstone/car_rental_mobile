import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";

import { useRoute } from "@react-navigation/native";
import icon from "assets/icons/checkBox.png";

const PaymentOption = () => {
  const [PaymentOption, setPaymentOption] = useState("Payment at Pick-Up");
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);

  const isFieldEmpty = (PaymentOption) => {
    if (PaymentOption === "") {
      return true;
    }
  };

  const newObject = { ...data, paymentOption: PaymentOption };
  console.log(JSON.stringify(newObject, null, 2));

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Payment Option</Text>
        </View>
        <Text style={styles.caption}>
          Please set an payment option for the client to avail your vehicle
          rental service.
        </Text>
        <Text style={styles.caption}>
          We only recommend{" "}
          <Text style={styles.boldCaption}>Payment at Pick Up</Text> option
          since this is the safest and easiest way to transact.
        </Text>
        <Text style={styles.caption}>
          You can also use other payment options like{" "}
          <Text style={styles.boldCaption}>Bank Transfer</Text> or{" "}
          <Text style={styles.boldCaption}>Gcash</Text> but the transaction will
          only be done between the client and you, R2G will have no involvement
          on this.
        </Text>
        <View style={styles.formContainer}>
          <Text style={styles.header2}>Current Payment Option :</Text>
          <View style={styles.optionContainer}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.option}>Payment at Pick-up</Text>
          </View>
        </View>

        <ProceedBtn
          data={newObject}
          disable={isFieldEmpty(PaymentOption)}
          contProps={{
            marginVertical: 30,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/upload-docs"}
        />
      </View>
    </MainLayout>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    width: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    alignSelf: "center",
  },
  header2: {
    fontSize: 15,
    fontWeight: "bold",
  },

  caption: {
    fontSize: 14,
    marginTop: 10,
  },
  boldCaption: { fontWeight: "bold" },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  formContainer: {
    flex: 1,
    gap: 15,
    marginTop: 20,
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: 24,
    height: 24,
  },
  optionContainer: {
    gap: 8,
    flexDirection: "row",
  },
});
