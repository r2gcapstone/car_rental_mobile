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
            display:
              //conditionally hide the tab bar
              currentRoute === "(tabs)/rent-a-vehicle/search-result" ||
              currentRoute === "(tabs)/rent-a-vehicle/selected-vehicle"
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
        name="rent-my-vehicle"
        options={{
          title: "Rent My Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
          tabBarStyle: {
            display:
              //conditionally hide the tab bar
              currentRoute === "(tabs)/rent-my-vehicle/register-vehicle" ||
              currentRoute === "(tabs)/rent-my-vehicle/upload-screen" ||
              currentRoute === "(tabs)/rent-my-vehicle/pickup-location" ||
              currentRoute === "(tabs)/rent-my-vehicle/dropoff-location" ||
              currentRoute === "(tabs)/rent-my-vehicle/price-rate" ||
              currentRoute === "(tabs)/rent-my-vehicle/outside-of-origin" ||
              currentRoute === "(tabs)/rent-my-vehicle/payment-option" ||
              currentRoute === "(tabs)/rent-my-vehicle/upload-docs" ||
              currentRoute === "(tabs)/rent-my-vehicle/success-screen"
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
        name="profile/index"
        options={{
          title: "My Profile",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
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
