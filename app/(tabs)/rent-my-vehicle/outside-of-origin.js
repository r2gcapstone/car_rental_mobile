import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import InputField from "components/InputField";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";
import { useRoute } from "@react-navigation/native";
//customHook
import useFilteredData from "hooks/useFilteredData";
//json
import municipalityData from "json/municipality.json";

const OutsideOfOrigin = () => {
  const [outsideRate, setOutsideRate] = useState({});
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);

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

  const filteredData = useFilteredData(
    municipalityData,
    data.pickupLocation.province.id,
    "province"
  );

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
              <Text style={styles.label}>
                {data.pickupLocation.municipality.name || "Origin Name"}
              </Text>
            </View>
          </View>
          {filteredData &&
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
        </View>

        <ProceedBtn
          data={newObject}
          disable={isFieldEmpty(outsideRate)}
          contProps={{
            marginVertical: 30,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/payment"}
        />
      </ScrollView>
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
});
