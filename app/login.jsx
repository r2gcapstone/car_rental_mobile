import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { login } from "api/auth";

// Components
// import View from "components/ThemedView";
import Text from "components/ThemedText";
import LoadingAnimation from "components/LoadingAnimation";
import ErrorMessage from "components/ErrorMessage";
import MainLayout from "layouts/MainLayout";
// Constants
import { colors } from "constants/Colors";
import { emailRegex } from "constants/RegexValidation";
import { router, Link } from "expo-router";
//hook
import { useUserContext } from "context/UserContext";

import { changePass } from "api/auth";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(
      text.trim() === "" || emailRegex.test(text)
        ? ""
        : "Invalid email address!"
    );
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(text.trim() === "" ? "Please enter your password." : "");
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const response = await login(email, password);

    if (response.userData) {
      setUser((prevUser) => ({
        ...prevUser, // Copy the previous user data
        userId: response.userData.userId,
        firstName: response.userData.firstName,
        middleName: response.userData.middleName,
        lastName: response.userData.lastName,
        address: response.userData.address,
        email: response.userData.email,
        imageUrl: response.userData.imageUrl,
        mobileNumber: response.userData.mobileNumber,
        dateCreated: response.userData.dateCreated,
      }));
    }

    setIsLoading(false);

    if (response.error === true) {
      if (
        response.status === "auth/user-not-found" ||
        response.status === "auth/wrong-password"
      ) {
        alert(
          "You have entered an invalid email or password, please try again!"
        );
        return;
      } else if (response.status === "auth/network-request-failed") {
        alert("Network Problem, please check your connection!");
      }
      alert(response.status);
    } else {
      router.push("/home");
    }
  };

  const handleRequestChangePass = async (email) => {
    handleEmailChange(email);

    if (emailError) {
      alert(emailError);
      return;
    }

    try {
      if (!email) {
        alert("Email field is empty!");
        return;
      }
      setIsLoading(true);
      const result = await changePass(email);
      setIsLoading(false);
      if (!result.error) {
        alert(result.message);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.logoTitle}>R2G</Text>
        <Text style={styles.appSlogan}>Your Go-To Car Rental Mobile App</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
        />
        <ErrorMessage error={emailError} />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <ErrorMessage error={passwordError} />

        <TouchableOpacity
          onPress={() => handleRequestChangePass(email)}
          style={styles.forgotPasswordButton}
        >
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={email === "" && password === ""}
          style={[
            styles.loginButton,
            { backgroundColor: colors.blue.slitedark },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
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

        <LoadingAnimation isVisible={isLoading} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
});

export default SignInScreen;
