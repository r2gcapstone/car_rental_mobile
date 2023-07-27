import { Link } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  //   CheckBox,
} from "react-native";

// import { CheckBox } from "@react-native-community/checkbox";

import View from "../components/ThemedView";
import Text from "../components/ThemedText";

import { colors } from "../constants/Colors";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleRegister = () => {
    // Validation and registration logic here
    if (!agreeToTerms) {
      alert("Please confirm that you agree to our terms & conditions.");
      return;
    }

    // Perform registration logic here
    // For example, make an API call to create a new account
    // If successful, navigate to the login screen or the main app screen
  };

  return (
    <View style={styles.container}>
      {/* Title and Logo */}
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>
            Create an account first before using Rent A Car Service
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Sign-Up Fields */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={handleUsernameChange}
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={handleFullNameChange}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={handleAddressChange}
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

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={handleMobileNumberChange}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      {/* Checkbox for Agreeing to Terms */}
      <View style={styles.checkboxContainer}>
        {/* <CheckBox value={agreeToTerms} onValueChange={setAgreeToTerms} /> */}
        <Text style={styles.checkboxLabel}>
          Please confirm that you agree to our terms & conditions
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.registerButton,
          { backgroundColor: colors.blue.slitedark },
        ]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  textContainer: {
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  logoContainer: {
    height: "auto",
  },
  logo: {
    width: 89,
    height: 107,
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
});

export default SignUpScreen;
