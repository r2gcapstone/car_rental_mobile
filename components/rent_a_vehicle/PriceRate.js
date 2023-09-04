import { StyleSheet, View, TextInput, Image } from "react-native";
import React from "react";

import Text from "components/ThemedText";

import { colors } from "constants/Colors";

export default function PriceRate({ filter, setFilter }) {
  const handleOnchange = (value) => {
    setFilter(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price Rate ( per day ) : </Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require("assets/icons/Peso.png")}
          ></Image>
        </View>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) =>
            handleOnchange({ ...filter, priceRate: value })
          }
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: colors.white[1],
    borderRadius: 5,
    height: 35,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  iconContainer: {
    paddingLeft: 20,
    borderRightWidth: 1,
    paddingRight: 10,
  },
  icon: {
    width: 16,
    height: 18,
    paddingLeft: 10,
  },
});
