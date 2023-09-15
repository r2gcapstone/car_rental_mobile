import { Stack, router, useSegments } from "expo-router";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function RentMyVehicleStack() {
  const segments = useSegments();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register-vehicle"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="upload-screen"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="pickup-location"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="dropoff-location"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="price-rate"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="outside-of-origin"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="payment-option"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="upload-docs"
        options={{
          href: null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backBtn}
                source={require("assets/icons/arrow.png")}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.blue.dark,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="success-screen"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 40,
    height: 20,
    width: 20,
    padding: 4,
    transform: [{ rotate: "180deg" }],
    marginBottom: 20,
  },
});
