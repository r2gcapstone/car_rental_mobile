import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { auth, firebaseConfig } from "../../services/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { SendVerificationCode, VerifyVerificationCode } from "api/auth";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";

//layout
import MainLayout from "layouts/MainLayout";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import InputField from "components/InputField";
import { useRoute } from "@react-navigation/native";
// Import the useNavigation hook
import { useNavigation } from "@react-navigation/native";

//constants
import { colors } from "constants/Colors";

const SendOtp = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const route = useRoute();
  const recaptchaVerifier = useRef(null);
  const [verId, setVerId] = useState("");
  const [otp, setOtp] = useState("");
  // Use the useNavigation hook
  const navigation = useNavigation();
  //prev data
  const data = route.params?.newData;

  const inputFieldArray = [
    {
      key: 0,
      value: "+639454757783",
      label: "Mobile Number :",
      type: "text",
      name: "number",
    },
  ];

  const handleOnChange = (text) => {
    setOtp(text);
  };

  const handleOnPress = async () => {
    try {
      const result = await SendVerificationCode(
        "+639454757783",
        recaptchaVerifier
      );
      setVerId(result);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyCode = async (verId, OTP) => {
    try {
      showLoading();
      const result = await VerifyVerificationCode("", verId, OTP);
      hideLoading();

      if (result.error) {
        alert(result.status);
      } else {
        navigation.navigate("(sign-up)/upload-avatar", {
          data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          mobile number by sending you a code and you will have to input it
          later.
        </Text>
      </View>

      {!verId && (
        <>
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

            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleOnPress()}
            >
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </>
      )}
      {verId && (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.textFieldContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleOnChange}
                keyboardType={"number-pad"}
                placeholder={"XXXXXX"}
                value={otp}
              />
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => verifyCode(verId, otp)}
            >
              <Text style={styles.btnText}>Verify Code</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Sign-Up Fields */}
      <LoadingComponent />
    </MainLayout>
  );
};

export default SendOtp;

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
    height: 45,
    backgroundColor: colors.blue.slitedark,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
  textFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.white[1],
    gap: 10,
  },
  input: {
    width: "100%",
    color: colors.textColor.dark2,
    fontSize: 16,
    overflow: "scroll",
  },
});
