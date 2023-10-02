import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import logo from "../../assets/icons/logo.png";

const ConfirmationModal = ({
  onClose,
  caption,
  btn1Text,
  btn2Text,
  btn1Props,
  handleOkayBtn,
}) => {
  return (
    <Modal style={styles.modal} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.box}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.pickerContainer}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={handleOkayBtn}
              style={[styles.btn, btn1Props]}
            >
              <Text style={styles.btnText}>{btn1Text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
              <Text style={styles.btnText}>{btn2Text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;

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
    backgroundColor: colors.blue.slitedark,
    height: "auto",
    width: "86%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 16,
    borderColor: "#757575",
    borderWidth: 1.5,
  },
  caption: {
    fontSize: 18,
    paddingTop: 10,
    textAlign: "center",
  },
  logo: {
    width: 73,
    height: 87,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    padding: 8,
    width: "30%",
    backgroundColor: "#27374D",
    borderRadius: 10,
  },
  btn1: {
    borderColor: "#fff",
    borderWidth: "1px",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
