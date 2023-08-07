import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// Import the useNavigation hook
import { useNavigation } from "@react-navigation/native";

//components
import View from "../../components/ThemedView";
import Text from "../../components/ThemedText";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingView";

//constants
import { colors } from "../../constants/Colors";
import { emailRegex, phoneNumberRegex } from "../../constants/RegexValidation";
import { toSentenceCase } from "../../constants/SentenceCase";

const SignUpScreen = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Use the useNavigation hook
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    if (emailRegex.test(email)) {
      return "";
    }
    return "Invalid email address!";
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumberRegex.test(phoneNumber)) {
      return "";
    }
    return "Invalid Mobile Number!";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Weak password!";
    }
    return "";
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    if (key === "email") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (key === "mobileNumber") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: validatePhoneNumber(value),
      }));
    } else if (key === "password") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    } else if (key === "confirmPassword") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          value === formData.password ? "" : "Password does not match!",
      }));
    }
  };

  const handleRegister = () => {
    const isFormEmpty = Object.values(formData).some((value) => !value);

    if (isFormEmpty) {
      alert("All fields are required");
      return;
    }

    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordValidationError,
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password does not match!",
      }));
      return;
    }

    if (!agreeToTerms) {
      alert("Please confirm that you agree to our terms and conditions!");
      return;
    }
    // Append the agreeToTerms value to the formData
    const signUpFormData = {
      ...formData,
      agreeToTerms: true,
    };

    // Proceed to upload profile image screen when validation is all passed
    navigation.navigate("(sign-up)/upload-avatar", { signUpFormData });
  };

  return (
    <KeyboardAvoidingContainer>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeView}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Title and Logo */}
            <View style={styles.titleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>
                  Create an account first before using{" "}
                  <Text style={{ color: "#9DB2BF", fontWeight: "bold" }}>
                    Rent A Car{" "}
                  </Text>
                  Service
                </Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={styles.logo}
                />
              </View>
            </View>
            {/* Sign-Up Fields */}
            <View style={styles.inputContainer}>
              {Object.keys(formData).map((key) => (
                <React.Fragment key={key}>
                  <Text style={styles.label}>{toSentenceCase(key)}</Text>
                  <TextInput
                    style={styles.input}
                    value={formData[key]}
                    onChangeText={(text) => handleInputChange(key, text)}
                    secureTextEntry={
                      key === "password" || key === "confirmPassword"
                    }
                  />
                  {!!formErrors[key] && (
                    <Text style={styles.errorText}>{formErrors[key]}</Text>
                  )}
                </React.Fragment>
              ))}
            </View>
            {/* Checkbox for Agreeing to Terms */}
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={colors.green[0]}
                unfillColor="#FFFFFF"
                style={styles.checkBox}
                innerIconStyle={{ borderWidth: 0 }}
                onPress={() => {
                  setAgreeToTerms((prevValue) => !prevValue);
                }}
              />

              <Text style={styles.checkboxLabel}>
                Please confirm that you agree to our
                <Link href={"/terms-and-conditions"}>
                  <Text style={styles.termsBtn}> Terms & Conditions</Text>
                </Link>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.registerButton]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: colors.blue.slitedark,
  },
  safeView: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    flex: 1,
  },
  checkBox: {
    borderRadius: 0,
    borderCurve: 0,
  },
  inputContainer: {
    flex: 1,
    height: "auto",
  },
  input: { flex: 1 },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-evenly",
    marginTop: 20,
    gap: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
  },
  termsBtn: {
    color: "#9DB2BF",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "left",
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  logoContainer: {
    height: "auto",
  },
  logo: {
    width: 100,
    height: 120,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
    marginBottom: 10,
  },
  checkboxLabel: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: colors.blue.slitedark,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
  errorText: {
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 5,
  },
});

export default SignUpScreen;
