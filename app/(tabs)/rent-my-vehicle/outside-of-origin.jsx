import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import InputField from "components/InputField";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";
import { useRoute } from "@react-navigation/native";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { getVehicleInfo, updateCarData } from "api/cars";
//customHook
import useFilteredData from "hooks/useFilteredData";
//json
import municipalityData from "json/municipality.json";

const OutsideOfOrigin = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [outsideRate, setOutsideRate] = useState();
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data) || "";
  console.log(data);

  const { mode, carId, label, placeOrigin } = data;

  const handleOnChangeText = (municipalityName, value) => {
    setOutsideRate((prevState) => ({
      ...prevState,
      [municipalityName]: value,
    }));
  };

  const isFieldEmpty = (outsideRate) => {
    if (outsideRate === "") {
      return true;
    }
  };

  const filteredData = () =>
    useFilteredData(
      municipalityData,
      data.pickupLocation.province.id,
      "province"
    ) || [];

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);
      hideLoading();
      if (!result.error) {
        setOutsideRate(result.outsideRate);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Edit Outside of Origin Rate") {
    key = "outsideRate";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarData(key, outsideRate, carId);
      hideLoading();
      console.log("result", JSON.stringify(result, null, 2));
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

  const newObject = { ...data, outsideRate: outsideRate };

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Outside of Origin Rate</Text>
        </View>
        <Text style={styles.caption}>
          This is an additional payment that depends on the distance from the
          origin to the destination, measured in kilometers.
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.originLabel}>
            <Text>Origin Location :</Text>
            <View style={styles.originField}>
              {mode !== "update" ? (
                <Text style={styles.label}>
                  {data.pickupLocation.municipality.name}
                </Text>
              ) : (
                <Text style={styles.label}>{placeOrigin}</Text>
              )}
            </View>
          </View>
          {mode !== "update" &&
            filteredData &&
            filteredData.map((item, index) => {
              if (
                item.municipality_name !== data.pickupLocation.municipality.name
              ) {
                return (
                  <InputField
                    key={index}
                    keyboardType="number-pad"
                    label="Origin Location to "
                    labelTarget={item.municipality_name}
                    textError="Please input a valid price"
                    type="number"
                    isIcon={true}
                    onChangeText={(value) =>
                      handleOnChangeText(item.municipality_name, value)
                    }
                  />
                );
              }
              return null;
            })}
          {mode == "update" &&
            outsideRate &&
            Object.entries(outsideRate)
              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
              .map(([key, value]) => {
                return (
                  <InputField
                    value={value.toString()}
                    key={key}
                    keyboardType="number-pad"
                    label="Origin Location to "
                    labelTarget={key}
                    textError="Please input a valid price"
                    type="number"
                    isIcon={true}
                    onChangeText={(value) => handleOnChangeText(key, value)}
                  />
                );
              })}
        </View>
      </ScrollView>
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
          disable={isFieldEmpty(outsideRate)}
          contProps={{
            marginBottom: 30,
            marginTop: 10,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/payment-option"}
        />
      )}
      <LoadingComponent />
    </MainLayout>
  );
};

export default OutsideOfOrigin;

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
  originLabel: {
    gap: 8,
    fontSize: 20,
  },
  originField: {
    height: 40,
    width: "100%",
    backgroundColor: colors.white[2],
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
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
});
