import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import Text from "components/ThemedText";

const UploadImage = ({ caption, name, imageUrl, setImageUrl, aspectRatio }) => {
  const pickImage = async (name) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspectRatio,
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
    <View>
      <View style={styles.uploadContainer}>
        {imageUrl[name] ? (
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => pickImage(name)}
          >
            <Image
              source={{ uri: imageUrl[name] }}
              style={styles.selectedImage}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.uploadBtnContainer}
            onPress={() => pickImage(name)}
          >
            <Image
              source={require("assets/icons/imgIcon.png")}
              style={styles.imgIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  imgIcon: {
    width: 32,
    height: 28,
    margin: 50,
  },
  uploadContainer: {
    flex: 1,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  btnContainer: {
    height: "auto",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  uploadBtnContainer: {
    position: "absolute",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    borderWidth: 2,
    objectFit: "cover",
  },
  imageButton: {
    flex: 1,
    width: "100%",
    objectFit: "cover",
  },
  caption: {
    alignSelf: "center",
    fontSize: 15,
    marginTop: 10,
  },
});
