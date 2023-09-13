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
        name="rent-a-vehicle/index"
        options={{
          title: "Rent A Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="rent-a-vehicle/search-result"
        options={{
          href: null,
          headerTintColor: "#fff",
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
            borderBottomWidth: 1,
            borderBottomColor: "#fff",
          },
          title: "Result",
          tabBarStyle: {
            display:
              //conditionally hide the tab bar
              segments[3] === "rent-a-vehicle/search-result" ? "none" : "flex",
            height: 0,
            marginVertical: -1,
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
              currentRoute === "(tabs)/rent-my-vehicle/dropoff-location"
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
