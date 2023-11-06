import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "components/ThemedText";
import { updateSpecificFeild } from "api/user";
import Dropdown2 from "components/button/DropDown2";
import municipalityData from "json/municipality.json";
import filterData from "utils/filterData";
import { useState } from "react";
//hook
import { useUserContext } from "context/UserContext";

const idInitialState = {
  municipalityId: "",
};

const addressInitialState = {
  province: {
    name: "Negros Occidental",
    id: 38,
  },
  municipality: {
    name: "",
    id: null,
  },
};

const ChangeLocModal = ({ onClose, addressProp: { setNewCity } }) => {
  const [id, setId] = useState(idInitialState);
  const [address, setAddress] = useState(addressInitialState);
  const { setUser } = useUserContext();

  const handleOnClick = async (address) => {
    const key = "address";

    await updateSpecificFeild(key, address.municipality);
    //will update value without checking the updateSpecificFeild response
    setNewCity(address.municipality.name);
    setUser((currentUser) => ({
      ...currentUser,
      address: {
        ...currentUser.address,
        municipality: address.municipality,
      },
    }));

    onClose();
  };

  const dropDownArray = [
    {
      key: 1,
      label: "Municipalty / city",
      name: "municipality",
      options: filterData(municipalityData, "province_id", address.province.id),
    },
  ];

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
          <Text>Choose new location :</Text>
          {dropDownArray.map(({ key, name, options }) => (
            <View style={{ paddingTop: -20, paddingVertical: 8 }} key={key}>
              <Dropdown2
                name={name}
                data={address}
                id={id}
                setId={setId}
                setData={setAddress}
                options={options}
              />
            </View>
          ))}
          <TouchableOpacity
            onPress={() => handleOnClick(address)}
            style={styles.proceedBtn}
          >
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
