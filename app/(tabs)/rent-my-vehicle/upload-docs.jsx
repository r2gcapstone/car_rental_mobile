import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import { colors } from "constants/Colors";
import { useRoute } from "@react-navigation/native";
import UploadImageBtn from "components/button/UploadImageBtn";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { router } from "expo-router";
import { getVehicleInfo, updateCarImage, RegisterCar } from "api/cars";
import { useUserContext } from "context/UserContext";

const initialState = {
  governmentId: "",
  BirthCert: "",
  CertificateOfReg: "",
};

const UploadDocs = () => {
  const route = useRoute();
  const { user } = useUserContext();
  const mobileNumber = user.mobileNumber;

  //prev data
  const data = JSON.parse(route.params?.data);
  const { mode, carId, label } = data;
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [document, setDocument] = useState(initialState);

  //check fields if empty
  const isFieldEmpty = (document) => {
    for (const key in document) {
      if (document[key] === "") {
        return true;
      }
    }
    return false;
  };

  //create new object
  const registerVehicle = {
    ...data,
    ownersNumber: mobileNumber,
    document: document,
  };

  const handlePress = async () => {
    showLoading();
    try {
      const result = await RegisterCar({ data: { ...registerVehicle } });
      if (!result.error) {
        hideLoading();
        router.push("rent-my-vehicle/success-screen");
        return;
      }
    } catch (error) {
      hideLoading();
      alert(
        "There has been an error registering a vehicle, please try again later."
      );
    }
  };

  // fetch data when screen is used for updating data
  const fetchData = async (id) => {
    try {
      showLoading();
      const result = await getVehicleInfo(id);
      hideLoading();
      if (!result.error) {
        setDocument(result.document);
      }
    } catch (error) {
      hideLoading();
    }
  };

  let key = "";
  if (label === "Edit Documents") {
    key = "document";
  }

  const handleOnPress = async (carId) => {
    try {
      showLoading();
      const result = await updateCarImage(key, document, carId);
      if (!result.error) {
        alert("Document successfully updated!");
      }
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchData(carId);
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Validity of Vehicle & Owner</Text>
        </View>
        <Text style={styles.caption}>
          Please upload a PNG/JPEG/Scanned file of your Valid ID, Birth
          Certificate and Certification of Registration of your vehicle that
          proves that the vehicle is belongs to you.
        </Text>
        <View style={styles.formContainer}>
          <UploadImageBtn
            label="Valid ID :"
            name="governmentId"
            imageUrl={document}
            setImageUrl={setDocument}
          />
          <UploadImageBtn
            label="Birth Certificate :"
            name="BirthCert"
            imageUrl={document}
            setImageUrl={setDocument}
          />
          <UploadImageBtn
            label="Certificate of Registration (Vehicle) : "
            name="CertificateOfReg"
            imageUrl={document}
            setImageUrl={setDocument}
          />
        </View>
      </ScrollView>
      {mode === "update" ? (
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => handleOnPress(carId)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.proceedBtn,
            isFieldEmpty(document) && { opacity: 0.5 },
          ]}
          disabled={isFieldEmpty(document)}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}

      <LoadingComponent />
    </MainLayout>
  );
};

export default UploadDocs;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 55,
    width: "100%",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
  },

  caption: {
    fontSize: 14,
    marginTop: 10,
  },
  boldCaption: { fontWeight: "bold" },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  formContainer: {
    flex: 1,
    gap: 15,
    marginTop: 20,
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: 24,
    height: 24,
  },
  optionContainer: {
    gap: 8,
    flexDirection: "row",
  },
  proceedBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.blue.slitedark,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
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
