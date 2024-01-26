import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Text from "components/ThemedText";

//layout
import MainLayout from "layouts/MainLayout";
import UploadImage from "components/rent_my_vehicle/UploadImage";
import ProceedBtn from "components/button/ProceedBtn";
import { useRoute } from "@react-navigation/native";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { getVehicleInfo, updateCarImage } from "api/cars";

//constants
import { colors } from "constants/Colors";

const initialState = {
  front: "",
  rear: "",
  sideRight: "",
  sideLeft: "",
  interior1: "",
  interior2: "",
};

const UploadScreen = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const route = useRoute();
  //vehicleDetails data
  const data = JSON.parse(route.params?.data);
  const { mode, carId, label } = data;
  const [imageUrl, setImageUrl] = useState(initialState);

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);
      hideLoading();
      if (!result.error) {
        setImageUrl(result.imageUrls);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Vehicle Image") {
    key = "imageUrls";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarImage(key, imageUrl, carId);
      if (!result.error) {
        alert("Image successfully updated!");
      }
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

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
            aspectRatio={[5, 3]}
          />
          <UploadImage
            caption="Side View (Left)"
            name="sideLeft"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            aspectRatio={[5, 3]}
          />
          <UploadImage
            caption="Side View (Right)"
            name="sideRight"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            aspectRatio={[5, 3]}
          />
          <UploadImage
            caption="Rear View of the Vehicle"
            name="rear"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            aspectRatio={[5, 3]}
          />
          <UploadImage
            caption="Inside of the Vehicle 1"
            name="interior1"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            aspectRatio={[5, 3]}
          />
          <UploadImage
            caption="Inside of the Vehicle 2"
            name="interior2"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            aspectRatio={[5, 3]}
          />
        </View>
        {mode === "update" ? (
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => handleOnPress(carId)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </ScrollView>
      <LoadingComponent />
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
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.slitedark,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: "-10%",
  },
});
