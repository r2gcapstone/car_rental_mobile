import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

import Text from "components/ThemedText";

import { colors } from "constants/Colors";

export default function PassengerCount({ setPassengerNum }) {
  const handleOnchange = (value) => {
    setPassengerNum(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Passengers</Text>
      <View style={styles.inputcContainer}>
        <TextInput
          placeholder="0"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleOnchange(value)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  inputcContainer: {
    width: "100%",
    backgroundColor: colors.white[1],
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 20,
  },
});
