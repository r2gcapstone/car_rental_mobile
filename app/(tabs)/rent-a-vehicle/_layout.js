import React from "react";
import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function RentAVehicleStack() {
  const headerProp = {
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: colors.blue.dark,
    },
    title: "",
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="search-result"
        options={({ navigation }) => ({
          ...headerProp,
          headerLeft: () => <CustomBackButton customText="Result" />,
        })}
      />
      <Stack.Screen
        name="selected-vehicle"
        options={({ navigation }) => ({
          ...headerProp,
          headerLeft: () => <CustomBackButton customText="Vehicle" />,
        })}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    height: 20,
    width: 20,
    padding: 4,
    transform: [{ rotate: "180deg" }],
  },
});

const CustomBackButton = ({ customText }) => (
  <TouchableOpacity
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 40,
      marginBottom: 12,
      gap: 8,
    }}
    onPress={() => router.back()}
  >
    <Image style={styles.backBtn} source={require("assets/icons/arrow.png")} />
    <Text style={{ color: "#fff", fontSize: 18 }}>{customText}</Text>
  </TouchableOpacity>
);
