import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "constants/Colors";
import icon from "assets/icons/location.png";

const ChangeLocation = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Your Location : <Text style={styles.content}>{address}</Text>
      </Text>
      <Image style={styles.icon} source={icon} />
    </View>
  );
};

export default ChangeLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blue.slitedark,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
  },
  icon: {
    width: 40,
    height: 41,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    fontWeight: "normal",
  },
});
