import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import ProceedBtn from "components/button/ProceedBtn";
import exit from "assets/icons/exit.png";

const ConfirmDestinationModal = ({
  onClose,
  option,
  data,
  prop: { destination, setDestination },
}) => {
  const handleOnChange = (e) => {
    if (e == "") {
      setDestination({ municipality: "", rate: null });
      return;
    }

    const result = Object.entries(option).find(([key]) => key === e);
    setDestination({ municipality: result[0], rate: +result[1] });
  };

  let newObject = {};
  if (destination.municipality !== "") {
    newObject = { ...data, destination };
  } else {
    newObject = { ...data };
  }

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
            the municipality. If no, choose None
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={destination.municipality}
              onValueChange={(value) => handleOnChange(value)}
              style={styles.picker}
            >
              <Picker.Item
                style={styles.label}
                label={"Choose City or Municipality"}
                value=""
              />

              {option &&
                Object.keys(option).map((key, index) => (
                  <Picker.Item key={index} label={key} value={key} />
                ))}
            </Picker>
          </View>
          <ProceedBtn
            data={newObject}
            contProps={{
              backgroundColor: colors.blue.dark,
            }}
            btnProps={{ fontSize: 16, fontWeight: "bold" }}
            btnText={"Proceed"}
            path={"rent-a-vehicle/booking-payment-info"}
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
