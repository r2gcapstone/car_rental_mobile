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
import { updateAllUserData, updateUserImage } from "api/user";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";

export default function UpdateUserInformation() {
  const { user, setUser } = useUserContext();
  const { toSentenceCase } = useSentenceCase();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [newImageUrl, setNewImageUrl] = useState(null);
  const { firstName, lastName, address, email, imageUrl, mobileNumber } =
    updatedUser;
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const [isEmail, setIsEmail] = useState(false);

  const handleOnChangeText = (name, value) => {
    if (name === "email") {
      setIsEmail(true);
    }
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImageUrl(result.assets[0].uri);
    }
  };

  const handleOnPress = async (userData) => {
    try {
      showLoading();
      setUpdatedUser({ ...updatedUser, imageUrl: newImageUrl });
      const result = await updateAllUserData(userData);
      hideLoading();
      if (!result.error) {
        setUser({ ...user, imageUrl: newImageUrl });
        router.replace({
          pathname: "profile/success-screen",
          params: {
            caption: "You have successfully updated your personal information",
            mode: isEmail && "updateEmail",
          },
        });
      }
    } catch (error) {
      hideLoading();
      alert(error);
    }
  };

  //Input Field Array
  const inputFieldArray = [
    {
      key: 1,
      value: firstName,
      label: "First Name :",
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
            {newImageUrl || imageUrl ? (
              <Image
                style={styles.avatar}
                source={{ uri: newImageUrl ? newImageUrl : imageUrl }}
              />
            ) : (
              <Text
                style={[
                  styles.avatar,
                  {
                    textAlign: "center",
                    backgroundColor: "#000",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              ></Text>
            )}

            <TouchableOpacity
              onPress={pickImage}
              style={{
                padding: 4,
                paddingHorizontal: 12,
                backgroundColor: "#D9D9D9",
                borderRadius: 10,
                marginTop: 10,
                flexDirection: "row",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#000" }}>Upload Image</Text>
              <Text style={{ color: "#000", fontSize: 18 }}>+</Text>
            </TouchableOpacity>
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
      <LoadingComponent />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23, //emulator
  },
  container: {
    marginTop: 20, //emulator
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
