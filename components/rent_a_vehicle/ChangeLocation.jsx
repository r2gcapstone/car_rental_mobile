import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "constants/Colors";
import icon from "assets/icons/location.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import ChangeLocModal from "./modal/ChangeLocModal";
import { useEffect } from "react";

const ChangeLocation = ({ city, setUser }) => {
  const [modal, setModal] = useState(false);
  const [newCity, setNewCity] = useState(city);
  const [placeholder, setPlaceholder] = useState("");

  const handleOnchange = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    setPlaceholder(newCity);
  }, [modal]);

  return (
    <TouchableOpacity onPress={handleOnchange}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Municipality / City :{"  "}
          <Text style={styles.content}>
            {placeholder ? placeholder : "No address set !"}
          </Text>
        </Text>
        <Image style={styles.icon} source={icon} />
      </View>
      {modal && (
        <ChangeLocModal
          onClose={handleOnchange}
          addressProp={{ newCity, setNewCity }}
          placeholder={placeholder}
        />
      )}
    </TouchableOpacity>
  );
};

export default ChangeLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blue.slitedark,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 41,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
  },
  content: {
    fontWeight: "normal",
  },
});
