import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import exit from "assets/icons/exit.png";

//Json
import municipalityData from "json/municipality.json";
import filterData from "utils/filterData";
import Dropdown2 from "components/button/DropDown2";
//

const ConfirmDestinationModal = ({
  onClose,
  data,
  prop: { destination, setDestination },
}) => {
  const [id, setId] = useState("");

  const dropDownArray = [
    {
      key: 1,
      label: "Municipalty / City",
      name: "municipality",
      options: filterData(
        municipalityData,
        "province_id",
        data.pickupLocation.province.id
      ),
    },
  ];

  const newObject = { ...data, destination };

  return (
    <Modal style={styles.modal} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.box}>
          <TouchableOpacity onPress={onClose} style={styles.exitBtn}>
            <Image style={styles.btn} source={exit} />
          </TouchableOpacity>
          <Text style={styles.caption}>
            If you're traveling outside the city of origin, please state city or
            the municipality. If not, please press proceed.
          </Text>
          {dropDownArray.map(({ key, label, name, options }) => (
            <Dropdown2
              label={label}
              name={name}
              id={id}
              setId={setId}
              data={destination}
              setData={setDestination}
              options={options}
              key={key}
            />
          ))}
          <ProceedBtn
            data={newObject}
            contProps={{
              backgroundColor: colors.blue.dark,
            }}
            btnProps={{ fontSize: 16, fontWeight: "bold" }}
            btnText={"Proceed"}
            path={"rent-a-vehicle/renting-info"}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmDestinationModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exitBtn: {
    right: 4,
    top: 4,
    position: "absolute",
  },
  btn: {
    padding: 8,
    height: 20,
    width: 20,
    opacity: 0.8,
  },
  box: {
    position: "absolute",
    backgroundColor: colors.blue.slitedark,
    height: "auto",
    width: "86%",
    alignSelf: "center",
    padding: 25,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 16,
    borderColor: "#757575",
    borderWidth: 1.5,
  },
  caption: {
    fontSize: 14,
    paddingTop: 10,
  },
  label: {
    color: colors.textColor.dark2,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  picker: {
    height: 40,
  },
});
