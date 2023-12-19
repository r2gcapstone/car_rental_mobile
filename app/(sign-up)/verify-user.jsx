import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

//layout
import MainLayout from "layouts/MainLayout";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import InputField from "components/InputField";
import { useRoute } from "@react-navigation/native";

//constants
import { colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const VerifyUser = () => {
  const route = useRoute();
  //prev data
  const data = route.params?.newData;

  console.log(JSON.stringify(data, null, 2));

  const inputFieldArray = [
    {
      key: 0,
      value: data.email,
      label: "Email :",
      type: "text",
      name: "email",
    },
  ];

  const handleOnPress = async () => {};

  return (
    <MainLayout>
      {/* Title and Logo */}

      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Email Verification</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          To ensure the validity of your account, we require you to verify your
          email address by sending you a code and you will have to input it
          later.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {inputFieldArray.map(
          ({ key, value, label, type, name, keyboardType, textError }) => (
            <InputField
              key={key}
              textProp={{ color: colors.dark2 }}
              label={label}
              type={type}
              name={name}
              textError={textError}
              keyboardType={keyboardType}
              value={value}
            />
          )
        )}

        <TouchableOpacity style={styles.btn} onPress={() => handleOnPress()}>
          <Text style={styles.btnText}>Verify Email</Text>
        </TouchableOpacity>
      </View>

      {/* Sign-Up Fields */}
    </MainLayout>
  );
};

export default VerifyUser;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginTop: 4,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-evenly",
    marginTop: 20,
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "left",
  },
  logoContainer: {
    height: "auto",
  },
  logo: {
    width: 100,
    height: 120,
  },
  inputContainer: {
    marginTop: 20,
    height: 130,
  },
  btn: {
    width: "100%",
    flexGrow: 1,
    height: 40,
    backgroundColor: colors.blue.slitedark,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
