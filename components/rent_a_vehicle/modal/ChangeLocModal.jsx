import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import InputField from "components/InputField";
import updateUserData from "api/user";

const ChangeLocModal = ({
  onClose,
  addressProp: { newAddress, setNewAddress },
  placeholder,
}) => {
  const key = "address";
  const handleOnClick = async () => {
    const response = await updateUserData(key, newAddress);
    if (!response.error) {
      onClose();
    }
  };

  const handleOnChange = (value) => {
    setNewAddress(value);
  };
  return (
    <Modal
      style={styles.modal}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.box}>
          <InputField
            label={"Current Location :"}
            type="text"
            name="plateNumber"
            placeholder={placeholder}
            onChangeText={(value) => handleOnChange(value)}
            required
          />
          <TouchableOpacity onPress={handleOnClick} style={styles.proceedBtn}>
            <Text style={styles.buttonText}>Change Location</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangeLocModal;

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
  box: {
    position: "absolute",
    backgroundColor: "#27374D",
    height: "auto",
    width: "86%",
    alignSelf: "center",
    padding: 20,
    paddingVertical: 25,
    borderRadius: 10,
    gap: 16,
    borderColor: "#757575",
    borderWidth: 1.5,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
  },
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F00",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "normal",
    paddingHorizontal: 10,
  },
});
