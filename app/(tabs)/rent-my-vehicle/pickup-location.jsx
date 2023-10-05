import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import InputField from "components/InputField";
import Dropdown2 from "components/button/DropDown2";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";
import provinceData from "json/province.json";
import regionData from "json/region.json";
import municipalityData from "json/municipality.json";
import barangayData from "json/barangay.json";
import { useRoute } from "@react-navigation/native";
import filterData from "utils/filterData";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { getVehicleInfo, updateCarData } from "api/cars";

const idInitialState = {
  regionId: "",
  provinceId: "",
  municipalityId: "",
  barangayId: "",
};

const addressInitialState = {
  country: "Philippines",
  region: {
    name: "",
    id: "",
  },
  province: {
    name: "",
    id: "",
  },
  municipality: {
    name: "",
    id: "",
  },
  barangay: {
    name: "",
    id: "",
  },
  streetName: "",
  houseNumber: "",
  zipCode: "",
};

const PickupLocation = () => {
  const [id, setId] = useState(idInitialState);
  const [address, setAddress] = useState(addressInitialState);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const route = useRoute();
  //vehicleDetails data
  const data = JSON.parse(route.params?.data);
  const { mode, carId, label } = data;
  const handleOnChangeText = (name, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const isAddressEmpty = () => {
    const { streetName, houseNumber, ...rest } = address;
    return Object.values(rest).some((value) => value === "");
  };

  // Define a function to reset dependent fields
  const resetDependentFields = (field) => {
    const newAddress = { ...address };
    const newId = { ...id };

    if (field === "region") {
      newAddress.province = "";
      newAddress.municipality = "";
      newAddress.barangay = "";
      newId.provinceId = "";
      newId.municipalityId = "";
      newId.barangayId = "";
    } else if (field === "province") {
      newAddress.municipality = "";
      newAddress.barangay = "";
      newId.municipalityId = "";
      newId.barangayId = "";
    } else if (field === "municipality") {
      newAddress.barangay = "";
      newId.barangayId = "";
    }

    setAddress(newAddress);
    setId(newId);
  };

  //dropdown Array
  const dropDownArray = [
    {
      key: 1,
      label: "Region :",
      name: "region",
      options: regionData,
    },
    {
      key: 2,
      label: "Province :",
      name: "province",
      options:
        address.region &&
        filterData(
          provinceData,
          "region_id",
          mode === "update" ? address.region.id : id.regionId
        ),
    },
    {
      key: 3,
      label: "Municipality / City :",
      name: "municipality",
      options:
        address.region &&
        address.province &&
        filterData(
          municipalityData,
          "province_id",
          mode === "update" ? address.province.id : id.provinceId
        ),
    },
    {
      key: 4,
      label: "Barangay :",
      name: "barangay",
      options:
        address.region &&
        address.province &&
        address.municipality &&
        filterData(
          barangayData,
          "municipality_id",
          mode === "update" ? address.municipality.id : id.municipalityId
        ),
    },
  ];

  //Input Field Array
  const inputFieldArray = [
    {
      key: 1,
      placeholder: "Optional",
      label: "Street Name :",
      type: "text",
      name: "streetName",
    },
    {
      key: 2,
      placeholder: "Optional",
      label: "House Number :",
      type: "text",
      name: "houseNumber",
    },
    {
      key: 3,
      placeholder: "",
      label: "Zip Code :",
      type: "number",
      name: "zipCode",
      keyboardType: "number-pad",
      textError: "Please enter a valid zip code",
    },
  ];

  // Reset the fields when the region field changes
  useEffect(() => {
    resetDependentFields("region");
  }, [address.region]);

  // Reset the fields when the province field changes
  useEffect(() => {
    resetDependentFields("province");
  }, [address.province]);

  // Reset the fields when the municipality field changes
  useEffect(() => {
    resetDependentFields("municipality");
  }, [address.municipality]);

  useEffect(() => {
    resetDependentFields("barangay");
  }, [address.barangay]);

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);

      console.log(JSON.stringify(result, null, 2));
      hideLoading();
      if (!result.error) {
        setAddress(result.pickupLocation);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Edit Pick-Up Location") {
    key = "pickupLocation";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarData(key, address, carId);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

  const newObject = { ...data, pickupLocation: address };

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Pick-up Location</Text>
        </View>
        <Text style={styles.caption}>
          Please state the location of the Pick-Up of your vehicle.
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.countryLabel}>
            <Text>Country :</Text>
            <View style={styles.countryField}>
              <Text style={styles.label}>Philippines</Text>
            </View>
          </View>
          {dropDownArray.map(({ key, label, name, options }) => (
            <Dropdown2
              label={label}
              name={name}
              id={id}
              setId={setId}
              data={address}
              setData={setAddress}
              options={options}
              key={key}
            />
          ))}

          {inputFieldArray.map(
            ({
              key,
              placeholder,
              label,
              type,
              name,
              keyboardType,
              textError,
            }) => (
              <InputField
                key={key}
                placeholder={placeholder}
                label={label}
                type={type}
                name={name}
                textError={textError}
                keyboardType={keyboardType}
                onChangeText={(value) => handleOnChangeText(name, value)}
                value={mode === "update" ? address[name] : address[name]}
              />
            )
          )}
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
            disable={isAddressEmpty()}
            contProps={{
              marginVertical: 30,
              backgroundColor: colors.blue.slitedark,
            }}
            btnText={"Proceed"}
            path={"rent-my-vehicle/dropoff-location"}
          />
        )}
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

export default PickupLocation;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 55,
    width: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
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
  countryLabel: {
    flex: 1,
    gap: 8,
    fontSize: 16,
  },
  countryField: {
    flex: 1,
    height: 40,
    width: "100%",
    backgroundColor: colors.white[2],
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
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
