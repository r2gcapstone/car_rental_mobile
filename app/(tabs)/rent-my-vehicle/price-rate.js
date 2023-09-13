import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import InputField from "components/InputField";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";

import { useRoute } from "@react-navigation/native";

const DropoffLocation = () => {
  const [priceRate, setPriceRate] = useState("");
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);

  const handleOnChangeText = (value) => {
    setPriceRate(value);
  };

  const isFieldEmpty = (priceRate) => {
    if (priceRate === "") {
      return true;
    }
  };

  const newObject = { ...data, priceRate: priceRate };

  useEffect(() => {
    console.log(JSON.stringify(newObject, null, 2));
  }, [priceRate]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Price Rate for Rental</Text>
        </View>
        <Text style={styles.caption}>
          Please state a price rate for the customer, rate will be per day in
          PHP currency.
        </Text>
        <View style={styles.formContainer}>
          <InputField
            placeholder="e.g : 1500"
            keyboardType="number-pad"
            label={"Price per day :"}
            textError="Please input a valid price"
            type="number"
            name="priceRate"
            isIcon={true}
            onChangeText={(value) => handleOnChangeText(value)}
          />
        </View>

        <ProceedBtn
          data={newObject}
          disable={isFieldEmpty(priceRate)}
          contProps={{
            marginVertical: 30,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/outside-of-origin"}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default DropoffLocation;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 55,
    width: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caption: {
    fontSize: 14,
    marginTop: 10,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    gap: 20,
  },
});
