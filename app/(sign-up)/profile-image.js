import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

//components
import View from "../../components/ThemedView";
import Text from "../../components/ThemedText";

//constants
import { colors } from "../../constants/Colors";

//context
import { useSignUp } from "../../context/SignUpContext";

//firebase
import { signup } from "../../api/auth";

export default function ProfileImage() {
  // const [image, setImage] = useState(null);
  const {
    firstName,
    lastName,
    address,
    email,
    mobileNumber,
    password,
    imageUrl,
    setImageUrl,
    agreeToTerms,
  } = useSignUp();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    const response = await signup(
      firstName,
      lastName,
      address,
      email,
      mobileNumber,
      password,
      imageUrl,
      agreeToTerms
    );

    if (response.error === true) {
      // console.error(response.error);
      alert(response.status);
    } else {
      alert("Signup Success!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.uploadContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.selectedImage} />
        ) : (
          <Image
            source={require("../../assets/images/profileIcon.png")}
            style={styles.profileIcon}
          />
        )}

        <Text style={styles.uploadText}>Upload Profile Picture</Text>

        <TouchableOpacity style={styles.uploadBtnContainer} onPress={pickImage}>
          <Text style={styles.uploadBtnText}>Upload Image +</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleRegister}>
          <Text style={styles.proceedBtnText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.skipBtnText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  profileIcon: {
    width: 250,
    height: 250,
  },
  uploadContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btnContainer: {
    height: "auto",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 20,
  },
  uploadBtnContainer: {
    padding: 4,
    backgroundColor: "#A6A6A6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    marginTop: 20,
  },
  uploadText: {
    marginTop: 20,
    fontSize: 26,
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 19,
    padding: 10,
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 200,
    borderColor: "#fff",
    borderWidth: 3,
  },
  proceedButton: {
    backgroundColor: colors.blue.slitedark,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  proceedBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
  },
  skipBtnText: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: "#fff",
  },
});
