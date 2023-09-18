import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "constants/Colors";

export default function RentAVehicleStack() {
  const BackButton = () => (
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
      <Image
        style={styles.backBtn}
        source={require("assets/icons/arrow.png")}
      />
      <Text style={{ color: "#fff", fontSize: 18 }}>Result</Text>
    </TouchableOpacity>
  );

  const headerProp = {
    href: null,
    headerTintColor: "#fff",
    headerLeft: () => <BackButton />,
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
        options={{
          ...headerProp,
        }}
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
