import { Link } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { login } from "../api/auth";

//components
import View from "../components/ThemedView";
import Text from "../components/ThemedText";
import LoadingAnimation from "../components/LoadingAnimation";

//constants
import { colors } from "../constants/Colors";
import { emailRegex } from "../constants/RegexValidation";
import { async } from "@firebase/util";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async () => {
    setIsLoading(true); // Show loading modal

    const response = await login(email, password);
    console.log("response:", response);

    if (response.error === true) {
      setIsLoading(false);

      if (response.status === "auth/user-not-found") {
        alert(
          "You have entered an invalid email or password, please try again!"
        );
        return;
      }
      alert(response.status);
    } else {
      setIsLoading(false);
      // router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and App Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.logoTitle}>R2G</Text>
      <Text style={styles.appSlogan}>Your Go-To Car Rental Mobile App</Text>

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
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: colors.blue.slitedark }]}
        onPress={handleLogin}
      >
        <Link href="/">
          <Text style={styles.buttonText}>Login</Text>
        </Link>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <Link href={"/sign-up"} asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register here!</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logoTitle: {
    fontSize: 46,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appSlogan: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  logoContainer: {
    height: "auto",
    // marginTop: 20,
    marginBottom: 0,
  },
  logo: {
    width: 89,
    height: 107,
    marginBottom: 10,
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
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  registerContainer: {},
  registerText: {
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  registerButton: {},
  buttonText: {
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
