import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Text from "components/ThemedText";

//layout
import MainLayout from "layouts/MainLayout";
import UploadImage from "components/rent_my_vehicle/UploadImage";
import ProceedBtn from "components/button/ProceedBtn";
import { useRoute } from "@react-navigation/native";

//constants
import { colors } from "constants/Colors";

const UploadScreen = () => {
  const route = useRoute();
  //vehicleDetails data
  const data = JSON.parse(route.params?.data);

  const [imageUrl, setImageUrl] = useState({
    front: "",
    rear: "",
    sideRight: "",
    sideLeft: "",
    interior1: "",
    interior2: "",
  });

  const newObject = { vehicleDetails: data, imageUrls: imageUrl };

  const isImageUrlEmpty = (imageUrl) =>
    Object.values(imageUrl).some((value) => value === "");

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
          data={newObject}
          disable={isImageUrlEmpty(imageUrl)}
          contProps={{
            marginVertical: 20,
            backgroundColor: colors.blue.slitedark,
          }}
          btnText={"Proceed"}
          path={"rent-my-vehicle/pickup-location"}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 55,
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
    paddingBottom: 6,
  },
  imageContainer: {
    flex: 1,
    height: "100%",
    marginTop: 20,
    gap: 24,
  },
});
