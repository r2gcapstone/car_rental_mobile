import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Text from "components/ThemedText";

//layout
import MainLayout from "layouts/MainLayout";
import UploadImage from "components/rent_my_vehicle/UploadImage";
import ProceedBtn from "components/button/ProceedBtn";

//constants
import { colors } from "constants/Colors";

const UploadScreen = () => {
  const [imageUrl, setImageUrl] = useState({
    front: "",
    rear: "",
    sideRight: "",
    sideLeft: "",
    interior1: "",
    interior2: "",
  });

  const isImageUrlEmpty = (imageUrl) =>
    Object.values(imageUrl).every((value) => value === "");

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Vehicle Images</Text>
        </View>
        <Text style={styles.caption}>
          Please upload several images of your vehicle for the customer to see.
        </Text>
        <View style={styles.imageContainer}>
          <UploadImage
            caption="Front View of the Vehicle"
            name="front"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <UploadImage
            caption="Side View (Left)"
            name="sideLeft"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <UploadImage
            caption="Side View (Right)"
            name="sideRight"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <UploadImage
            caption="Rear View of the Vehicle"
            name="rear"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <UploadImage
            caption="Inside of the Vehicle 2"
            name="interior1"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <UploadImage
            caption="Inside of the Vehicle 2"
            name="interior2"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </View>
        <ProceedBtn
          disable={isImageUrlEmpty(imageUrl)}
          contProps={{
            marginVertical: 20,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          link={"rent-my-vehicle/pick-up-location"}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 45,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    fontSize: 14,
    marginTop: 10,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 1,
    height: "100%",
    marginTop: 20,
    gap: 24,
  },
});
