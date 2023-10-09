import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import MainLayout from "layouts/MainLayout";
import Text from "components/ThemedText";
import { colors } from "constants/Colors";
import { router } from "expo-router";
import { updateUserPassword } from "api/user";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";

const ChangePass = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const handleOnChangeText = (name, value) => {
    if (name === "password") {
      setPassword(value);
      validatePassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPass(value);
      validateConfirmPassword(value);
    }
  };

  const handleOnPress = async () => {
    // Validate the password here
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPass);

    if (passwordValidation || confirmPasswordValidation) {
      // Set errors and return if there are validation errors
      setPasswordError(passwordValidation);
      setConfirmPassError(confirmPasswordValidation);
      return;
    }

    try {
      showLoading();
      const result = await updateUserPassword(password);
      hideLoading();
      if (!result.error) {
        router.replace({
          pathname: "profile/success-screen",
          params: {
            caption: "You are required to log in again in the application",
            mode: "updatePass",
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Weak password! Password must be at least 6 characters.";
    }
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match!";
    }
    return "";
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>
          Please provide a new password for your account.
        </Text>
        <View style={styles.row}>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>New Password :</Text>
            <TextInput
              style={styles.input}
              name="password"
              onChangeText={(value) => handleOnChangeText("password", value)}
              secureTextEntry={true}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Repeat Password :</Text>
            <TextInput
              style={styles.input}
              name="confirmPassword"
              onChangeText={(value) =>
                handleOnChangeText("confirmPassword", value)
              }
              secureTextEntry={true}
            />
            {confirmPassError && (
              <Text style={styles.errorText}>{confirmPassError}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={() => handleOnPress()} style={styles.btn}>
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <LoadingComponent />
    </MainLayout>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
  },
  row: {
    flex: 1,
    height: "auto",
    width: "100%",
    height: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    justifyContent: "flex-start",
  },

  header: {
    fontSize: 18,
  },
  btn: {
    backgroundColor: colors.red.primary,
    height: 44,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginVertical: 20,
  },
  btnText: {
    fontSize: 16,
  },
  textFieldContainer: {
    flexDirection: "col",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  input: {
    width: "100%",
    color: colors.textColor.dark2,
    fontSize: 16,
    overflow: "scroll",
    backgroundColor: colors.white[1],
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  labelTarget: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
  },
});
