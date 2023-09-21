import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import { colors } from "constants/Colors";
import { useRoute } from "@react-navigation/native";
import UploadImageBtn from "components/button/UploadImageBtn";
import { RegisterCar } from "api/cars";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { router } from "expo-router";
import formatdate from "../../../utils/formatDate";

const UploadDocs = () => {
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const [document, setDocument] = useState({
    governmentId: "",
    BirthCert: "",
    CertificateOfReg: "",
  });
  const currentDate = new Date();
  const route = useRoute();

  //prev data
  const data = JSON.parse(route.params?.data);

  //format date
  const formattedDate = formatdate(currentDate);

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
    document: document,
    dateCreated: formattedDate,
  };

  const handleOnPress = async () => {
    showLoading();
    try {
      const result = await RegisterCar({ data: { ...registerVehicle } });
      console.log(result);
      if (!result.error) {
        hideLoading();
        router.push("rent-my-vehicle/success-screen");
        return;
      }
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

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
      <TouchableOpacity
        style={[styles.proceedBtn, isFieldEmpty(document) && { opacity: 0.5 }]}
        // disabled={isFieldEmpty(document)}
        onPress={handleOnPress}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
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
});
