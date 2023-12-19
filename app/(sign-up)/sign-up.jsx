import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
//layout
import MainLayout from "layouts/MainLayout";
// Import the useNavigation hook
import { useNavigation } from "@react-navigation/native";
//components
import View from "components/ThemedView";
import Text from "components/ThemedText";
import Dropdown2 from "components/button/DropDown2";
import municipalityData from "json/municipality.json";
import barangayData from "json/barangay.json";
import filterData from "utils/filterData";

//constants
import { colors } from "../../constants/Colors";
import { emailRegex, phoneNumberRegex } from "constants/RegexValidation";
import { toSentenceCase } from "constants/SentenceCase";

const idInitialState = {
  municipalityId: "",
};

const addressInitialState = {
  country: "Philippines",
  province: {
    name: "Negros Occidental",
    id: 38,
  },
  municipality: {
    name: "",
    id: null,
  },
  barangay: {
    name: "",
    id: null,
  },
  subdivision: "",
  street: "",
};

const SignUpScreen = () => {
  const [id, setId] = useState(idInitialState);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Use the useNavigation hook
  const navigation = useNavigation();

  const [address, setAddress] = useState(addressInitialState);

  //formData object for signup fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleInputAddress = (key, value) => {
    setAddress((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleRegister = () => {
    const isFormEmpty = Object.values(formData).some((value) => !value);
    const { subdivision, ...rest } = address;
    const isAddressEmpty = Object.values(rest).some((value) => !value);

    if (isFormEmpty || isAddressEmpty) {
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
    const newData = {
      ...formData,
      agreeToTerms: true,
      address: address,
    };

    // Proceed to upload profile image screen when validation is all passed
    navigation.navigate("(sign-up)/verify-user", {
      newData,
    });
  };

  const renderDropdown = (array) => {
    return array.map(({ key, name, options }) => (
      <View style={{ paddingTop: -20, paddingVertical: 8 }} key={key}>
        <Dropdown2
          name={name}
          data={address}
          id={id}
          setId={setId}
          setData={setAddress}
          options={options}
        />
      </View>
    ));
  };

  const dropDownArray = [
    {
      key: 1,
      label: "Municipalty / City",
      name: "municipality",
      options: filterData(municipalityData, "province_id", address.province.id),
    },
  ];

  const dropDownArray2 = [
    {
      key: 1,
      label: "Barangay",
      name: "barangay",
      options: filterData(
        barangayData,
        "municipality_id",
        address.municipality.id
      ),
    },
  ];

  const isImmutableKey = (key) => key === "province" || key === "country";
  const isAddressNameKey = (key) =>
    key === "province" || key === "municipality";

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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
              source={require("assets/images/logo.png")}
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
        {/* Address fields */}
        <Text style={styles.formBreak}>Address</Text>
        <View style={styles.inputContainer}>
          {Object.keys(address).map((key) => (
            <React.Fragment key={key}>
              <Text style={styles.label}>
                {key === "municipality"
                  ? toSentenceCase(key) + " / City"
                  : toSentenceCase(key)}
              </Text>

              {key === "municipality" ? (
                renderDropdown(dropDownArray)
              ) : key === "barangay" ? (
                renderDropdown(dropDownArray2)
              ) : (
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isImmutableKey(key)
                        ? colors.white[2]
                        : "#fff",
                      color: colors.textColor.dark,
                      fontSize: 16,
                    },
                  ]}
                  editable={!isImmutableKey(key)}
                  value={
                    isAddressNameKey(key) ? address[key].name : address[key]
                  }
                  placeholder={key === "subdivision" ? "Optional" : ""}
                  onChangeText={(text) => handleInputAddress(key, text)}
                />
              )}

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
            fillColor="#2DCB2A"
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
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: colors.blue.slitedark,
  },
  scroll: {
    flex: 1,
    width: "100%",
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
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white[1],
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

  formBreak: {
    fontWeight: "bold",
    fontSize: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.white[2],
    borderBottomColor: colors.white[2],
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default SignUpScreen;
