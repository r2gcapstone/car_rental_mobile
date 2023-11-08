import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "components/ThemedText";
import { logout } from "api/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { colors } from "constants/Colors";
import LoadingAnimation from "components/LoadingAnimation";
import { StatusBar } from "react-native";
import { useUserContext } from "context/UserContext";
import useNotifications from "hooks/useNotifications";
import { updateSubscription } from "api/subscription";

const Header = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useUserContext();
  const notifCount = useNotifications();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await logout();
      if (response.status === 200) {
        setIsLoading(false);
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBellOnPress = () => {
    router.push("/notification");
  };

  useEffect(() => {
    setUser({ ...user, notifCount: notifCount });
  }, [notifCount]);

  useEffect(() => {
    updateSubscription();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.logoText}>R2G</Text>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.notifContainer}
          onPress={handleBellOnPress}
        >
          {user.notifCount > 0 && (
            <Text style={styles.notifCound}>{user.notifCount}</Text>
          )}

          <Image
            source={require("assets/images/bell.png")}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal((prevValue) => !prevValue)}>
          <Image
            source={require("assets/images/logout.png")}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </View>
      {modal ? (
        <View style={styles.logoutModal}>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}
      <LoadingAnimation isVisible={isLoading} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 32,
    paddingTop: StatusBar.currentHeight,
  },
  bellIcon: {
    height: 28,
    width: 28,
  },
  logoutIcon: {
    height: 20,
    width: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  logoText: {
    fontSize: 27,
  },
  logo: {
    height: 52,
    width: 44,
  },
  logoutModal: {
    padding: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: colors.blue.slitedark,
    borderRadius: 5,
    position: "absolute",
    top: 65,
    right: 0,
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOffset: 0.8,
    shadowOpacity: 0.2,
  },
  notifContainer: {
    height: 38,
    width: 32,
    justifyContent: "center",
  },
  notifCound: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF0000",
    zIndex: 1,
    paddingHorizontal: 2,
    minWidth: 20,
    maxWidth: 30,
    height: 20,
    borderRadius: 10,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "600",
  },
});
