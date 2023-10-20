import React from "react";
import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function RentingApplicationStack() {
  const headerProp = {
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: colors.blue.dark,
    },
    title: "",
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton
              router={router}
              customText="Applicants for Renting"
            />
          ),
        })}
      />
      <Stack.Screen
        name="booking-information"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton
              router={router}
              customText="Booking Information"
            />
          ),
        })}
      />
      <Stack.Screen
        name="success-screen"
        options={() => ({
          ...headerProp,
          headerShown: false,
          headerLeft: () => <CustomBackButton router={router} customText="" />,
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

const CustomBackButton = ({ customText, router }) => (
  <TouchableOpacity
    style={{
      marginTop: 40, // emulator
      paddingBottom: 10, // emulator
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    }}
    onPress={() => router.back()}
  >
    <Image style={styles.backBtn} source={require("assets/icons/arrow.png")} />
    <Text style={{ color: "#fff", fontSize: 18 }}>{customText}</Text>
  </TouchableOpacity>
);
