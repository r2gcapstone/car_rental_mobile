import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import InputField from "components/InputField";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { getVehicleInfo, updateCarData } from "api/cars";

import { useRoute } from "@react-navigation/native";

const PriceRate = () => {
  const [priceRate, setPriceRate] = useState(null);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);

  const { mode, carId, label } = data;
  console.log(data);

  const handleOnChangeText = (value) => {
    setPriceRate(+value);
  };

  const isFieldEmpty = (priceRate) => {
    if (priceRate === "") {
      return true;
    }
  };

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);
      console.log("result", JSON.stringify(result, null, 2));
      hideLoading();
      if (!result.error) {
        setPriceRate(result.priceRate);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Edit Price Rate") {
    key = "priceRate";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarData(key, priceRate, carId);
      hideLoading();
      console.log("result", JSON.stringify(result, null, 2));
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

  const newObject = { ...data, priceRate: priceRate };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Price Rate for Rental</Text>
        </View>
        <Text style={styles.caption}>
          Please state a price rate for the customer, rate will be per day in
          PHP currency.
        </Text>
        <View style={styles.formContainer}>
          <InputField
            placeholder={priceRate.toString() || "e.g 1500"}
            keyboardType="number-pad"
            label={"Price per day :"}
            textError="Please input a valid price"
            type="number"
            name="priceRate"
            isIcon={true}
            onChangeText={(value) => handleOnChangeText(value)}
          />
        </View>

        {mode === "update" ? (
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => handleOnPress(carId)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
      <LoadingComponent />
    </MainLayout>
  );
};

export default PriceRate;

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
  },
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.slitedark,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: "-10%",
  },
});
