import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
//components
import ThemeContext from "context/ThemeContext";
import DefaultTheme from "constants/Theme";
//userContext
import { UserProvider } from "context/UserContext";
import { LocationProvider } from "context/LocationContext";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { colors } from "constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/Inter-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
const headerProp = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: colors.blue.dark,
  },
  title: "",
};

function RootLayoutNav() {
  return (
    <ThemeContext.Provider value={DefaultTheme}>
      <UserProvider>
        <LocationProvider>
          <Stack
            screenOptions={{
              statusBarStyle: "light",
              statusBarColor: "transparent",
              statusBarTranslucent: true,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />

            {/* Signup */}
            <Stack.Screen
              name="(sign-up)/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(helper)/terms-and-conditions"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(sign-up)/upload-avatar"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(sign-up)/success-modal"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notification)/notification"
              options={() => ({
                ...headerProp,
                headerLeft: () => (
                  <CustomBackButton
                    router={router}
                    customText="Notifications"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="(notification)/write-review"
              options={() => ({
                ...headerProp,
                headerLeft: () => (
                  <CustomBackButton router={router} customText="" />
                ),
              })}
            />

            {/* tabs*/}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </LocationProvider>
      </UserProvider>
    </ThemeContext.Provider>
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
