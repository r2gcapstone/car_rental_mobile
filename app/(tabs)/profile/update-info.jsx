import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import Text from "components/ThemedText";
import { useUserContext } from "context/UserContext";
import useSentenceCase from "hooks/useSentenceCase";
import InputField from "components/InputField";
import { colors } from "constants/Colors";
import { updateAllUserData } from "api/user";
import { router } from "expo-router";

export default function UpdateUserInformation() {
  const { user, setUser } = useUserContext();
  const { toSentenceCase } = useSentenceCase();
  const [updatedUser, setUpdatedUser] = useState(user);

  const { firstName, lastName, address, email, imageUrl, mobileNumber } =
    updatedUser;

  const handleOnChangeText = (name, value) => {
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnPress = async (userData) => {
    try {
      const result = await updateAllUserData(userData);
      if (!result.error) {
        router.replace({
          pathname: "profile/success-screen",
          params: {
            caption: "You have successfully updated your personal information",
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  //Input Field Array
  const inputFieldArray = [
    {
      key: 1,
      value: firstName,
      label: "Full Name :",
      type: "text",
      name: "firstName",
    },
    {
      key: 2,
      value: lastName,
      label: "Last Name :",
      type: "text",
      name: "lastName",
    },
    {
      key: 3,
      value: address,
      label: "Address :",
      type: "text",
      name: "address",
    },
    {
      key: 4,
      value: email,
      label: "Email :",
      type: "text",
      name: "email",
    },
    {
      key: 5,
      value: mobileNumber,
      label: "Mobile Number :",
      type: "number",
      name: "mobileNumber",
      keyboardType: "number-pad",
      textError: "Please enter a valid number",
    },
  ];

  useEffect(() => {
    setUser(() => ({
      ...updatedUser,
    }));
  }, [updatedUser]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.avatar} source={{ uri: imageUrl }} />
          </View>
          <View style={styles.row}>
            {updatedUser &&
              inputFieldArray.map(
                ({
                  key,
                  value,
                  label,
                  type,
                  name,
                  keyboardType,
                  textError,
                }) => (
                  <InputField
                    textProp={{ color: colors.dark2 }}
                    key={key}
                    label={label}
                    type={type}
                    name={name}
                    textError={textError}
                    keyboardType={keyboardType}
                    onChangeText={(value) => handleOnChangeText(name, value)}
                    value={name !== "email" ? toSentenceCase(value) : value}
                  />
                )
              )}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOnPress(user)}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "space-between",
  },
  row: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  btn: {
    backgroundColor: colors.blue.primary,
    height: 44,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginVertical: 40,
  },
  btnText: {
    fontSize: 20,
  },
});
