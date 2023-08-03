import { Link } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";

//components
import View from "../../components/ThemedView";
import Text from "../../components/ThemedText";

//constants
import { colors } from "../../constants/Colors";
import { emailRegex, phoneNumberRegex } from "../../constants/RegexValidation";

//firebase
import { signup } from "../../api/auth";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  //validation
  const [emailError, setEmailError] = useState("");
  const [MobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !email ||
      !mobileNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Weak password!");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setPasswordError2("Password does not match!");
      return;
    } else {
      setPasswordError2("");
    }

    const response = await signup(
      firstName,
      lastName,
      address,
      email,
      mobileNumber,
      password
    );

    if (response.error === true) {
      // console.error(response.error);
      alert(response.status);
    } else {
      alert("Signup Success!");
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    setMobileNumber(phoneNumber);
    if (phoneNumberRegex.test(phoneNumber)) {
      setMobileError("");
    } else {
      setMobileError("Invalid Mobile Number!");
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    // Validate email
    if (text.trim() === "" || emailRegex.test(text)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address!");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
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
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
              />
            </View>
          </View>

          {/* Sign-Up Fields */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
          />
          {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={isValidPhoneNumber}
          />
          {!!MobileError && <Text style={styles.errorText}>{MobileError}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {!!passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          {!!passwordError2 && (
            <Text style={styles.errorText}>{passwordError2}</Text>
          )}

          {/* Checkbox for Agreeing to Terms */}
          <View style={styles.checkboxContainer}>
            {/* <CheckBox value={agreeToTerms} onValueChange={setAgreeToTerms} /> */}
            <Pressable>
              <Link href={"/terms-and-conditions"}>
                <Text style={styles.checkboxLabel}>
                  Please confirm that you agree to our terms & conditions
                </Text>
              </Link>
            </Pressable>
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              { backgroundColor: colors.blue.slitedark },
            ]}
            onPress={handleRegister}
          >
            {/* <Link href={"/"}> */}
            <Text style={styles.buttonText}>Register</Text>
            {/* </Link> */}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  textContainer: { flex: 1 },
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
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
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
