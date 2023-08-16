import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { colors } from "constants/Colors";

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#526D82",
          borderColor: "#526D82",
          paddingBottom: 5,
          height: 55,
        },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="(home)/home"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(rent-a-vehicle)/rent-a-vehicle"
        options={{
          title: "Rent A Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(rent-my-vehicle)/rent-my-vehicle"
        options={{
          title: "Rent My Vehicle",
          tabBarActiveTintColor: "#27374D",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(profile)/profile"
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
