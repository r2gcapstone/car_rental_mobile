import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
//components
import ThemeContext from "context/ThemeContext";
import DefaultTheme from "constants/Theme";
//userContext
import { UserProvider } from "context/UserContext";
import { LocationProvider } from "context/LocationContext";

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

            {/* tabs*/}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </LocationProvider>
      </UserProvider>
    </ThemeContext.Provider>
  );
}
