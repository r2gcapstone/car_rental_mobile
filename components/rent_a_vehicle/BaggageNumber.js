import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

import Text from "components/ThemedText";

import { colors } from "constants/Colors";

export default function BaggageNumber({ filter, setFilter }) {
  const handleOnchange = (value) => {
    setFilter(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Baggage count : </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) =>
            handleOnchange({ ...filter, baggageNum: value })
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
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  inputContainer: {
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
