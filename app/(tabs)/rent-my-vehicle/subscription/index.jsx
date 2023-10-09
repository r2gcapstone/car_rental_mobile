import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "components/ThemedText";
import { colors } from "constants/Colors";
import { piggy, subscription } from "assets/icons/index";
import subImage from "assets/images/subscription.png";
import { router } from "expo-router";

//layout
import MainLayout from "layouts/MainLayout";

const buyPath = "rent-my-vehicle/subscription/buy-subscription";
const myPath = "rent-my-vehicle/subscription/my-subscription";

const Subscription = () => {
  const handleOnPress = (label, path) => {
    if (label === "buy") {
      router.push({ pathname: path });
    }
    router.push({ pathname: path });
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.rowImg}>
          <Image style={styles.img} source={subImage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.caption}>
            Once your vehicle is registered in the application, you are now
            eligible to purchase a subscription that will enhance your vehicle's
            visibility and promote it to potential renters through the R2G
            Application.
          </Text>
          <Text style={styles.caption}>
            You can select from a range of subscription options by clicking on
            <Text style={styles.caption2}> Buy Subscriptions.</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => handleOnPress("buy", buyPath)}
            style={styles.btn}
          >
            <Image style={styles.icon} source={piggy} />
            <Text style={styles.btnText}>Buy Subscriptions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnPress("my", myPath)}
            style={styles.btn}
          >
            <Image style={styles.icon} source={subscription} />
            <Text style={styles.btnText}>My Subscriptions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  row: {
    flex: 1,
    gap: 15,
    width: "100%",
  },
  rowImg: {
    gap: 15,
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
    height: 200,
  },
  caption: {
    flex: 1,
    fontSize: 15,
  },
  caption2: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  btn: {
    width: "100%",
    height: 45,
    backgroundColor: colors.blue.slitedark,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
  },
  btnText: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: -15,
  },
});
