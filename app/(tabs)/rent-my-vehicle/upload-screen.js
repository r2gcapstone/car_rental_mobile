import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Text from "components/ThemedText";

//layout
import MainLayout from "layouts/MainLayout";
import UploadImage from "components/rent_my_vehicle/UploadImage";
import ProceedBtn from "../../../components/button/ProceedBtn";

//constants
import { colors } from "constants/Colors";

const UploadScreen = () => {
  const [imageUrls, setImageUrls] = useState({
    front: null,
    rear: null,
    sideRight: null,
    sideLeft: null,
    interior1: null,
    interior2: null,
  });

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);
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
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          <UploadImage
            caption="Side View (Left)"
            name="sideLeft"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          <UploadImage
            caption="Side View (Right)"
            name="sideRight"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          <UploadImage
            caption="Rear View of the Vehicle"
            name="rear"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          <UploadImage
            caption="Inside of the Vehicle 2"
            name="interior1"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          <UploadImage
            caption="Inside of the Vehicle 2"
            name="interior2"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
        </View>
        <ProceedBtn
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
