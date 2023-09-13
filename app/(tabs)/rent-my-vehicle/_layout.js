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
          tabBarStyle: {
            display:
              //conditionally hide the tab bar
              segments[3] === "rent-my-vehicle/upload-screen" ? "none" : "flex",
            height: 0,
            marginVertical: -1,
          },
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
          tabBarStyle: {
            display:
              //conditionally hide the tab bar
              segments[3] === "rent-my-vehicle/pickup-location"
                ? "none"
                : "flex",
            height: 0,
            marginVertical: -1,
          },
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
