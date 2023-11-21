import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
// layout
import MainLayout from "layouts/MainLayout";
// components
import Text from "components/ThemedText";
import VehicleType from "components/rent_my_vehicle/VehicleType";
import GearShiftDropdown from "components/rent_my_vehicle/GearType";
import FuelType from "components/rent_my_vehicle/FuelType";
import InputField from "components/InputField";
import { useRoute } from "@react-navigation/native";
import ProceedBtn from "components/button/ProceedBtn";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { getVehicleInfo, updateCarData } from "api/cars";
// constants
import { colors } from "constants/Colors";

const initialState = {
  vehicleName: "",
  model: "",
  vehicleType: "",
  gearType: "",
  fuelType: "",
  passengerCount: "",
  luggageCount: "",
  plateNumber: "",
};

export default function RegisterVehicle() {
  const route = useRoute();
  // prev data
  const data = JSON.parse(route.params?.data || "{}");
  const { mode, carId, label } = data;
  const [formData, setFormData] = useState(initialState);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const handleOnhangeText = (name, value) => {
    if (name === "passengerCount" || name === "luggageCount") {
      setFormData({ ...formData, [name]: +value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isFormDataEmpty = (formData) => {
    for (const key in formData) {
      if (formData[key] === "") {
        return true;
      }
    }
    return false;
  };

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);
      hideLoading();
      if (!result.error) {
        setFormData(result.vehicleDetails);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Edit Vehicle Information") {
    key = "vehicleDetails";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarData(key, formData, carId);
      if (!result.error) {
        alert("Vehicle Information updated successfully!");
      }
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Vehicle Information</Text>
        </View>
        <Text style={styles.caption}>
          Please fill up the important information to proceed.
        </Text>

        <View style={styles.formContainer}>
          <InputField
            value={formData.vehicleName}
            label={"Vehicle Name :"}
            keyboardType="default"
            type="text"
            name="vehicleName"
            onChangeText={(value) => handleOnhangeText("vehicleName", value)}
            required
          />
          <InputField
            value={formData.model}
            label={"Model :"}
            keyboardType="default"
            type="text"
            name="model"
            onChangeText={(value) => handleOnhangeText("model", value)}
            required
          />
          <VehicleType formData={formData} setFormData={setFormData} />
          <GearShiftDropdown formData={formData} setFormData={setFormData} />
          <InputField
            value={formData.passengerCount.toString()}
            label={"Number of Passengers :"}
            keyboardType="number-pad"
            type="number"
            name="passengerCount"
            onChangeText={(value) => handleOnhangeText("passengerCount", value)}
            required
          />
          <FuelType formData={formData} setFormData={setFormData} />
          <InputField
            value={formData.luggageCount.toString()}
            label={"Number of Luggage :"}
            keyboardType="number-pad"
            type="number"
            name="luggageCount"
            onChangeText={(value) => handleOnhangeText("luggageCount", value)}
            required
          />
          <InputField
            value={formData.plateNumber.toString()}
            label={"Plate Number :"}
            keyboardType="default"
            type="text"
            name="plateNumber"
            onChangeText={(value) => handleOnhangeText("plateNumber", value)}
            required
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
            data={formData}
            disable={isFormDataEmpty(formData)}
            contProps={{ marginTop: 25, marginBottom: 40 }}
            btnProps={{ fontSize: 18 }}
            btnText={"Proceed"}
            path={"rent-my-vehicle/upload-screen"}
          />
        )}
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 55,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
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
    marginTop: 25,
    gap: 14,
    flex: 1,
    height: "auto",
    overflow: "scroll",
    justifyContent: "space-evenly",
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
