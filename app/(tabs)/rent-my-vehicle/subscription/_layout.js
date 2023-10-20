import React from "react";
import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function SubscriptionStack() {
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
            <CustomBackButton router={router} customText="Subscriptions" />
          ),
        })}
      />
      <Stack.Screen
        name="buy-subscription"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton router={router} customText="Buy Subscription" />
          ),
        })}
      />
      <Stack.Screen
        name="my-subscription"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton router={router} customText="My Subscription" />
          ),
        })}
      />
      <Stack.Screen
        name="choose-vehicle"
        options={() => ({
          ...headerProp,
          headerLeft: () => (
            <CustomBackButton router={router} customText="Choose Vehicle" />
          ),
        })}
      />
      <Stack.Screen
        name="subscription-info"
        options={() => ({
          ...headerProp,
          headerLeft: () => <CustomBackButton router={router} customText="" />,
        })}
      />
      <Stack.Screen
        name="payment-info"
        options={() => ({
          ...headerProp,
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
