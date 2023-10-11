import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image style={styles.img} source={subImage} />
          <View style={styles.row}>
            <Text style={styles.caption}>
              Once your vehicle is registered in the application, you are now
              eligible to purchase a subscription that will enhance your
              vehicle's visibility and promote it to potential renters through
              the R2G Application.
            </Text>
            <Text style={styles.caption}>
              You can select from a range of subscription options by clicking on
              <Text style={styles.caption2}> Buy Subscriptions.</Text>
            </Text>
          </View>
          <View style={styles.btnContainer}>
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
      </ScrollView>
    </MainLayout>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -23,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  row: {
    flex: 1,
    gap: 15,
    width: "100%",
    marginBottomBottom: 20,
  },
  btnContainer: {
    gap: 10,
    marginTop: 20,
    paddingBottom: 40,
  },
  caption: {
    fontSize: 15,
  },
  caption2: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  img: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    gap: 15,
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 20,
  },
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
