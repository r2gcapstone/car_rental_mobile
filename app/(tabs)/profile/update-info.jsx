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
import * as ImagePicker from "expo-image-picker";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import Dropdown2 from "components/button/DropDown2";
import municipalityData from "json/municipality.json";
import filterData from "utils/filterData";

const idInitialState = {
  municipalityId: "",
};

const addressInitialState = {
  province: {
    name: "Negros Occidental",
    id: 38,
  },
  municipality: {
    name: "",
    id: null,
  },
};

export default function UpdateUserInformation() {
  const { user, setUser } = useUserContext();
  const { toSentenceCase } = useSentenceCase();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [newImageUrl, setNewImageUrl] = useState(user.imageUrl);
  const {
    username,
    firstName,
    lastName,
    address: { subdivision, barangay, street, municipality },
    email,
    imageUrl,
    mobileNumber,
  } = updatedUser;
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [isEmail, setIsEmail] = useState(false);
  const [id, setId] = useState(idInitialState);
  const [address, setAddress] = useState(addressInitialState);

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

  const handleOnPress = async (updatedUser) => {
    try {
      showLoading();

      let result = await updateAllUserData({
        ...updatedUser,
        imageUrl: newImageUrl,
      });

      hideLoading();
      if (!result.error) {
        if (newImageUrl !== result.imageUrl) {
          setUser({ ...user, imageUrl: result.imageUrl });
          setUpdatedUser({ ...updatedUser, imageUrl: result.imageUrl });
        }
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

  const dropDownArray = [
    {
      key: 1,
      label: "Municipalty / city",
      name: "municipality",
      options: filterData(municipalityData, "province_id", address.province.id),
    },
  ];

  //Input Field Array
  const inputFieldArray = [
    {
      key: 0,
      value: username,
      label: "Username :",
      type: "text",
      name: "username",
    },
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
      value: subdivision,
      label: "Subdivision :",
      type: "text",
      name: "subdivision",
    },
    {
      key: 4,
      value: street,
      label: "Street :",
      type: "text",
      name: "street",
    },
    {
      key: 5,
      value: barangay,
      label: "Barangay :",
      type: "text",
      name: "barangay",
    },
    {
      key: 6,
      value: municipality,
      label: "Municipality :",
    },
    {
      key: 7,
      value: email,
      label: "Email :",
      type: "text",
      name: "email",
    },
    {
      key: 8,
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
                  <View style={{ flex: 1, width: "100%" }} key={key}>
                    {key === 6 ? (
                      dropDownArray.map(({ key, name, options }) => (
                        <View
                          style={{
                            width: "100%",
                          }}
                          key={key}
                        >
                          <Dropdown2
                            label={label}
                            name={name}
                            data={address}
                            id={id}
                            setId={setId}
                            setData={setAddress}
                            options={options}
                          />
                        </View>
                      ))
                    ) : (
                      <InputField
                        textProp={{ color: colors.dark2 }}
                        label={label}
                        type={type}
                        name={name}
                        textError={textError}
                        keyboardType={keyboardType}
                        onChangeText={(value) =>
                          handleOnChangeText(name, value)
                        }
                        value={name !== "email" ? toSentenceCase(value) : value}
                      />
                    )}
                  </View>
                )
              )}
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOnPress(updatedUser)}
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
