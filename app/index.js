import { Link } from "expo-router";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

import ThemeContext from "../context/ThemeContext";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const theme = useContext(ThemeContext);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (text) => {
    setEmail(text);
    // Validate email
    if (text.trim() === "" || emailRegex.test(text)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address!");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Validate password
    if (text.trim() === "") {
      setPasswordError("Please enter your password.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please input a valid email address!");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    // Perform login logic here
    // For example, make an API call to authenticate the user
    // If successful, navigate to the main app screen
  };

  const handleRegister = () => {
    console.log("Register btn Clicked!");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Logo and App Title */}
      <Text style={[styles.logo, { color: theme.textColor }]}>R2G</Text>
      <Text style={[styles.appTitle, { color: theme.textColor }]}>
        Your Go-To Car Rental Mobile App
      </Text>

      {/* Sign-In Fields */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        id="Email"
        style={styles.input}
        // placeholder="Email"
        autoComplete="email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        id="Password"
        style={styles.input}
        // placeholder="Password"
        autoComplete="password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButton}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Link href="/">
          <Pressable>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Link>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>Register here!</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: { alignSelf: "flex-start" },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    color: "#000",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  registerContainer: {},
  registerText: {
    // marginRight: 5,
    fontWeight: "700",
  },
  registerButton: {},
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  errorText: {
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 5,
  },
});

export default SignInScreen;
