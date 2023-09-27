import { Modal, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import exit from "assets/icons/exit.png";
import { RentCar } from "api/cars";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { router } from "expo-router";

const RulesRegulationModal = ({ onClose, data }) => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const handleOnClick = async () => {
    try {
      showLoading();
      const result = await RentCar(data);

      if (result.error) {
        hideLoading();
        return;
      }
      router.replace("(tabs)/rent-a-vehicle/success-screen");
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

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
            Before you rent a vehicle, we have to confirm it first to the
            vehicle owner.
          </Text>
          <Text style={styles.caption2}>
            We will give the vehicle owner{" "}
            <Text style={{ fontWeight: "bold" }}>1 day</Text> to respond to your
            application for renting. If the vehicle owner fail to respond it
            will be considered{" "}
            <Text style={{ fontWeight: "bold", color: colors.red.primary }}>
              rejected.
            </Text>
          </Text>
          <Text style={styles.caption3}>
            You will also be given an option to{" "}
            <Text style={{ fontWeight: "bold", color: "#FFD600" }}>cancel</Text>{" "}
            your application for booking but{" "}
            <Text style={{ fontWeight: "bold" }}>ONLY</Text> when the vehicle
            owner haven’t{" "}
            <Text style={{ fontWeight: "bold", color: "#1C8A00" }}>
              approved
            </Text>{" "}
            your application for renting yet.
          </Text>
          <Text style={styles.caption4}>
            For now we will give your application the{" "}
            <Text style={{ fontWeight: "bold", color: "#0071F6" }}>
              “pending”{" "}
            </Text>{" "}
            status.
          </Text>

          <View style={styles.pickerContainer}></View>
          <TouchableOpacity onPress={handleOnClick} style={styles.btn2}>
            <Text style={styles.btnText}>Apply for Renting</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <LoadingComponent />
    </Modal>
  );
};

export default RulesRegulationModal;

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
    right: 8,
    top: 8,
    position: "absolute",
  },
  btn: {
    padding: 8,
    height: 24,
    width: 24,
    opacity: 0.8,
  },
  btn2: {
    width: "100%",
    height: 40,
    backgroundColor: colors.blue.strongblue,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
  box: {
    position: "absolute",
    backgroundColor: "#252525",
    height: "auto",
    width: "86%",
    alignSelf: "center",
    padding: 25,
    paddingTop: 25,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 10,
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
