import React from "react";
import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function ProfileStack() {
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
        name="update-info"
        options={() => ({
          ...headerProp,
          headerLeft: () => <CustomBackButton router={router} customText="" />,
        })}
      />
      <Stack.Screen
        name="change-pass"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton router={router} customText="Change Password" />
          ),
        })}
      />
      <Stack.Screen name="success-screen" options={{ headerShown: false }} />
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
