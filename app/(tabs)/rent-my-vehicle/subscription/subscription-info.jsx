import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import useSentenceCase from "hooks/useSentenceCase";
import PaymentMethodDropDown from "components/button/PaymentMethodDropDown";
import { colors } from "constants/Colors";

//layout
import MainLayout from "layouts/MainLayout";
import { KeyboardAvoidingView } from "react-native";

const ChooseVehicle = () => {
  const { toSentenceCase } = useSentenceCase();
  const route = useRoute();
  const data = JSON.parse(route.params?.data);
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleOnChange = (val) => {
    setSelectedMethod(val);
  };

  const isFieldEmpty = (value) => {
    if (value === "") {
      return true;
    }
  };

  const paymentMethodOptions = [
    { id: 1, label: "Gcash", value: "gcash" },
    { id: 2, label: "Paypal", value: "Paypal" },
    { id: 3, label: "Bank Transfer", value: "Bank Transfer" },
  ];

  const dataArray = [
    {
      id: 1,
      headerTxt: "Vehicle Information",
      label: "Vehicle :",
      value: data.value,
    },
    {
      id: 2,
      headerTxt: "Subscription Information",
      label: "Type of Subscription :",
      label2: "Subscription Days Added :",
      value: data.type,
      value2: data.days,
    },
    {
      id: 3,
      headerTxt: "Payment Information",
      label: "Amount to Pay :",
      label2: "Payment Method :",
      value: `${data.price + " PHP"}`,
    },
  ];

  const newObject = { ...data, selectedMethod };

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.container}>
            {dataArray.map(
              ({ id, headerTxt, label, value, label2, value2 }) => (
                <View key={id} style={styles.row}>
                  <View style={styles.header}>
                    <Text style={styles.headerText}>{headerTxt}</Text>
                  </View>
                  <View style={styles.row2}>
                    <View style={styles.valueContainer}>
                      <Text style={styles.label}>{label}</Text>
                      <Text style={styles.value}>
                        {label === "Amount to Pay"
                          ? value
                          : toSentenceCase(value)}
                      </Text>
                    </View>
                    {label2 && (
                      <View style={styles.valueContainer}>
                        <Text style={styles.label}>{label2}</Text>
                        <View>
                          <Text style={styles.value}>
                            {label2 === "Subscription Days Added :" ? (
                              `${value2 + " days"}`
                            ) : (
                              <PaymentMethodDropDown
                                paymentMethod={selectedMethod}
                                options={paymentMethodOptions}
                                handleOnChange={handleOnChange}
                              />
                            )}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )
            )}
          </View>
          <ProceedBtn
            data={newObject}
            disable={isFieldEmpty(selectedMethod)}
            contProps={{
              marginBottom: 40,
              marginTop: 20,
              bottom: 0,
            }}
            btnProps={{ fontSize: 16, fontWeight: "bold" }}
            btnText={"Proceed"}
            path={"rent-my-vehicle/subscription/payment-info"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </MainLayout>
  );
};

export default ChooseVehicle;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -23,
    width: "100%",
  },
  container: {
    flex: 1,
    gap: 20,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  row: {
    gap: 20,
    flexDrection: "column",
  },
  row2: {
    width: "100%",
    flexDirection: "col",
    gap: 4,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  header: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 45,
    backgroundColor: colors.white[1],
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    alignSelf: "flex-start",
    color: "red",
    marginTop: -15,
    marginBottom: 40,
  },
});
