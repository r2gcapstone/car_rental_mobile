import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import SubDropdown from "components/button/SubDropdown";
import ProceedBtn from "components/button/ProceedBtn";

//layout
import MainLayout from "layouts/MainLayout";
import { getRegisteredVehicle } from "api/cars";

const ChooseVehicle = () => {
  const route = useRoute();
  const data = JSON.parse(route.params?.data);
  const { label, price } = data;
  const [vehicle, setVehicle] = useState();
  const [value, setValue] = useState("");
  const [days, setDays] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const fetchVehicle = async () => {
    try {
      const result = await getRegisteredVehicle();
      setVehicle(result);
    } catch (error) {}
  };

  const handleOnChange = (value, index) => {
    setValue(value);
    setSelectedVehicle(vehicle[index - 1]);
    console.log(value, index);
    //month is set to 30 days as default
    if (label === "MONTHLY") {
      setDays("30");
    } else if (label === "3 MONTHS") {
      setDays("90");
    } else if (label === "6 MONTHS") {
      setDays("180");
    } else {
      setDays("365");
    }
  };

  const isFieldEmpty = (value) => {
    if (value === "") {
      return true;
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const newObject = {
    type: label,
    price,
    value,
    days: days,
    imageUrls: selectedVehicle.imageUrls,
    carId: selectedVehicle.carId,
  };

  console.log(JSON.stringify(selectedVehicle, null, 2));

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.label}>
          Choose any of your vehicles for this subscription :
        </Text>

        <View style={styles.row}>
          <SubDropdown
            value={value}
            handleOnChange={handleOnChange}
            options={vehicle}
          />
        </View>
      </View>
      <ProceedBtn
        data={newObject}
        disable={isFieldEmpty(value)}
        contProps={{
          marginBottom: 40,
          marginTop: 20,
          bottom: 0,
        }}
        btnProps={{ fontSize: 16, fontWeight: "bold" }}
        btnText={"Proceed"}
        path={"rent-my-vehicle/subscription/subscription-info"}
      />
    </MainLayout>
  );
};

export default ChooseVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
  },
  row: {
    height: 45,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
});
