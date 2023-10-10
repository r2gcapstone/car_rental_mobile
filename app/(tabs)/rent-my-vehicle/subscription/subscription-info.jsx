import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import useSentenceCase from "hooks/useSentenceCase";
import WalletDropDown from "components/button/WalletDropDown";
import { colors } from "constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { phoneNumberRegex } from "constants/RegexValidation";
//layout
import MainLayout from "layouts/MainLayout";
import { KeyboardAvoidingView } from "react-native";

const ChooseVehicle = () => {
  const { toSentenceCase } = useSentenceCase();
  const route = useRoute();
  const data = JSON.parse(route.params?.data);
  const [wallet, setWallet] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (val) => {
    setWallet(val);
  };

  const handleOnChangeText = (value) => {
    const validNumber = validatePhoneNumber(value);
    setNumber(validNumber);
    if (validNumber === "") {
      setError("Invalid Mobile Number!");
    } else {
      setError("");
    }
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumberRegex.test(phoneNumber)) {
      return phoneNumber;
    }
    setError("Invalid Mobile Number!");
    return "";
  };

  const isFieldEmpty = (value) => {
    if (value === "") {
      return true;
    }
  };

  const paymentMethod = [{ id: 1, label: "Gcash", value: "", path: "" }];

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

  const newObject = { ...data, wallet, gcashNumber: number };

  useEffect(() => {
    console.log(newObject);
  }, [number]);

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
                              <WalletDropDown
                                wallet={wallet}
                                options={paymentMethod}
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

            {wallet && (
              <View style={styles.row}>
                <Text style={[styles.headerText, { marginTop: 20 }]}>
                  Please enter your Gcash Mobile Number :
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="ex : 09xxxxxxxxx"
                  style={styles.textInput}
                  onChangeText={(value) => handleOnChangeText(value)}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <ProceedBtn
        data={newObject}
        disable={isFieldEmpty(number)}
        contProps={{
          marginBottom: 40,
          marginTop: 20,
          bottom: 0,
        }}
        btnProps={{ fontSize: 16, fontWeight: "bold" }}
        btnText={"Proceed"}
        path={"rent-my-vehicle/subscription/payment-info"}
      />
    </MainLayout>
  );
};

export default ChooseVehicle;

const styles = StyleSheet.create({
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
  },
});
