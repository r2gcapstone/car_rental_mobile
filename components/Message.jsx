import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
//constants
import { colors } from "constants/Colors";

const Message = ({ path, message, subMessage, btnText }) => {
  const handleNav = () => {
    router.push(path);
  };
  return (
    <View style={styles.container}>
      <Image source={require("assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.successText}>{message}</Text>
      <Text style={styles.caption}>{subMessage()}</Text>

      {btnText && (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleNav}>
            <Text style={styles.proceedBtnText}>{btnText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 20,
  },
  logo: { width: 182, height: 220 },
  proceedButton: {
    backgroundColor: colors.blue.slitedark,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  btnContainer: {
    alignSelf: "center",
    width: "80%",
  },
  proceedBtnText: {
    fontSize: 19,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
  successText: {
    fontSize: 25,
    textAlign: "center",
  },
  caption: {
    textAlign: "center",
  },
});
