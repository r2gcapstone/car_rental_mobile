import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useSegments, router, Stack } from "expo-router";
import { Image } from "react-native";
import { colors } from "constants/Colors";
import { TouchableOpacity, StyleSheet } from "react-native";

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const segments = useSegments();
  const currentRoute = segments.join("/");

  const rentAVehicleRoute = [
    "(tabs)/rent-a-vehicle/search-result",
    "(tabs)/rent-a-vehicle/selected-vehicle",
    "(tabs)/rent-a-vehicle/vehicle-reviews",
    "(tabs)/rent-a-vehicle/renting-info",
    "(tabs)/rent-a-vehicle/rules-regulation",
    "(tabs)/rent-a-vehicle/success-screen",
    "(tabs)/rent-a-vehicle/renting-application",
    "(tabs)/rent-a-vehicle/renting-application/application-information",
  ];

  const rentMyVehicleRoute = [
    "(tabs)/rent-my-vehicle/register-vehicle",
    "(tabs)/rent-my-vehicle/upload-screen",
    "(tabs)/rent-my-vehicle/pickup-location",
    "(tabs)/rent-my-vehicle/dropoff-location",
    "(tabs)/rent-my-vehicle/price-rate",
    "(tabs)/rent-my-vehicle/outside-of-origin",
    "(tabs)/rent-my-vehicle/payment-option",
    "(tabs)/rent-my-vehicle/upload-docs",
    "(tabs)/rent-my-vehicle/success-screen",
    "(tabs)/rent-my-vehicle/my-vehicle",
    "(tabs)/rent-my-vehicle/my-vehicle/selected-vehicle",
    "(tabs)/rent-my-vehicle/renting-application",
    "(tabs)/rent-my-vehicle/renting-application/booking-information",
    "(tabs)/rent-my-vehicle/renting-application/success-screen",
    "(tabs)/rent-my-vehicle/subscription",
    "(tabs)/rent-my-vehicle/subscription/buy-subscription",
  ];

  const ProfileRoute = [
    "(tabs)/profile/update-info",
    "(tabs)/profile/change-pass",
    "(tabs)/profile/success-screen",
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.blue.slitedark,
          borderColor: colors.blue.slitedark,
          paddingBottom: 5,
          height: 55,
        },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="rent-a-vehicle"
        options={{
          title: "Rent A Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
          tabBarStyle: {
            display: rentAVehicleRoute.includes(currentRoute) ? "none" : "flex",
            backgroundColor: colors.blue.slitedark,
            borderColor: colors.blue.slitedark,
            paddingBottom: 5,
            height: 55,
          },
        }}
      />
      <Tabs.Screen
        name="rent-my-vehicle"
        options={{
          title: "Rent My Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
          tabBarStyle: {
            display: rentMyVehicleRoute.includes(currentRoute)
              ? "none"
              : "flex",
            backgroundColor: colors.blue.slitedark,
            borderColor: colors.blue.slitedark,
            paddingBottom: 5,
            height: 55,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
          tabBarStyle: {
            display: ProfileRoute.includes(currentRoute) ? "none" : "flex",
            backgroundColor: colors.blue.slitedark,
            borderColor: colors.blue.slitedark,
            paddingBottom: 5,
            height: 55,
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 18,
    height: 20,
    width: 20,
    transform: [{ rotate: "180deg" }],
  },
});
