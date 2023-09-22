import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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

const DropoffLocation = () => {
  const [id, setId] = useState({
    regionId: null,
    provinceId: null,
    municipalityId: null,
    barangayId: null,
  });
  const [address, setAddress] = useState({
    country: "Philippines",
    region: {
      name: "",
      id: null,
    },
    province: {
      name: "",
      id: null,
    },
    municipality: {
      name: "",
      id: null,
    },
    barangay: {
      name: "",
      id: null,
    },
    streetName: "",
    houseNumber: "",
    zipCode: "",
  });

  const route = useRoute();
  //vehicleDetails data
  const data = JSON.parse(route.params?.data);

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

  //filter functions
  const filteredProvinceData = provinceData.filter(
    (item) => item.region_id === id.regionId
  );

  const filteredMunicipalityData = municipalityData.filter(
    (item) => item.province_id === id.provinceId
  );

  const filteredBarangayData = barangayData.filter(
    (item) => item.municipality_id === id.municipalityId
  );

  // Define a function to reset dependent fields
  const resetDependentFields = (field) => {
    const newAddress = { ...address };
    const newId = { ...id };

    if (field === "region") {
      newAddress.province = "";
      newAddress.municipality = "";
      newAddress.barangay = "";
      newId.provinceId = null;
      newId.municipalityId = null;
      newId.barangayId = null;
    } else if (field === "province") {
      newAddress.municipality = "";
      newAddress.barangay = "";
      newId.municipalityId = null;
      newId.barangayId = null;
    } else if (field === "municipality") {
      newAddress.barangay = "";
      newId.barangayId = null;
    }

    setAddress(newAddress);
    setId(newId);
  };

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

  const newObject = { ...data, dropoffLocation: address };

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Drop-off Location</Text>
        </View>
        <Text style={styles.caption}>
          Please state the location of the Drop-off of your vehicle.
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.countryLabel}>
            <Text>Country :</Text>
            <View style={styles.countryField}>
              <Text style={styles.label}>Philippines</Text>
            </View>
          </View>
          <Dropdown2
            label="Region :"
            name="region"
            id={id}
            setId={setId}
            data={address}
            setData={setAddress}
            options={regionData}
          />
          <Dropdown2
            label="Province :"
            name="province"
            id={id}
            setId={setId}
            data={address}
            setData={setAddress}
            options={address.region && filteredProvinceData}
          />
          <Dropdown2
            label="Municipalit / City :"
            name="municipality"
            id={id}
            setId={setId}
            data={address}
            setData={setAddress}
            options={
              address.region && address.province && filteredMunicipalityData
            }
          />
          <Dropdown2
            label="Barangay :"
            name="barangay"
            id={id}
            setId={setId}
            data={address}
            setData={setAddress}
            options={
              address.region &&
              address.province &&
              address.municipality &&
              filteredBarangayData
            }
          />

          <InputField
            placeholder="Optional"
            label={"Street Name :"}
            type="text"
            name="streetName"
            onChangeText={(value) => handleOnChangeText("streetName", value)}
          />
          <InputField
            placeholder="Optional"
            label={"House Number :"}
            type="text"
            name="houseNumber"
            onChangeText={(value) => handleOnChangeText("houseNumber", value)}
          />
          <InputField
            label={"Zip Code :"}
            textError="Please enter a valid zip code"
            keyboardType="number-pad"
            type="number"
            name="zipCode"
            onChangeText={(value) => handleOnChangeText("zipCode", value)}
          />
        </View>

        <ProceedBtn
          data={newObject}
          disable={isAddressEmpty()}
          contProps={{
            marginVertical: 30,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/price-rate"}
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
});