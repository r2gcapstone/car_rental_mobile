import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../../constants/Colors";

import Text from "components/ThemedText";

const UploadImageBtn = ({
  label,
  name,
  imageUrl,
  setImageUrl,
  btnProps,
  imgProps,
  aspectRatio,
}) => {
  const pickImage = async (name) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspectRatio ? aspectRatio : [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl((prevImageUrl) => ({
        ...prevImageUrl,
        [name]: result.assets[0].uri,
      }));
    }
  };

  return (
    <View style={styles.uploadContainer}>
      {imageUrl[name] && (
        <Image
          source={{ uri: imageUrl[name] }}
          style={[styles.selectedImage, imgProps]}
        />
      )}
      <Text style={styles.label}> {label || ""}</Text>
      <TouchableOpacity
        style={[styles.uploadBtnContainer, btnProps]}
        onPress={() => pickImage(name)}
      >
        <Text style={styles.btnText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImageBtn;

const styles = StyleSheet.create({
  imgIcon: {
    width: 32,
    height: 28,
    margin: 50,
  },
  uploadContainer: {
    gap: 8,
    flexDirection: "column",
  },
  btnContainer: {
    height: "auto",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  uploadBtnContainer: {
    width: "100%",
    backgroundColor: colors.blue.strongblue,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 19,
    padding: 12,
  },
  label: {
    fontSize: 15,
  },
  selectedImage: {
    width: "100%",
    minHeight: 200,
    borderColor: "#6A6A6A",
    borderWidth: 2,
    borderRadius: 4,
    objectFit: "cover",
    borderRadius: 10,
    marginTop: 20,
  },
});
