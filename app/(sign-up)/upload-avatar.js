import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

//components
import View from "../../components/ThemedView";
import Text from "../../components/ThemedText";
import LoadingAnimation from "../../components/LoadingAnimation";

//constants
import { colors } from "../../constants/Colors";

//firebase
import { signup } from "../../api/auth";

export default function UploadAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const route = useRoute(); // Use the useRoute hook
  const { signUpFormData } = route.params; // Retrieve the signUpFormData parameter

  const {
    firstName,
    lastName,
    address,
    email,
    mobileNumber,
    password,
    agreeToTerms,
  } = signUpFormData;

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
    setIsLoading(true); // Show loading modal

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
      setIsLoading(false);
      alert(response.status);
    } else {
      setIsLoading(false);
      router.replace("/success-modal");
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

      <LoadingAnimation isVisible={isLoading} />
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
    borderRadius: 100,
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
    borderRadius: 18,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
