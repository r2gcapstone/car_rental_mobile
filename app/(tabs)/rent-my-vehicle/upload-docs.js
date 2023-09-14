import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Text from "components/ThemedText";
import MainLayout from "layouts/MainLayout";
import ProceedBtn from "components/button/ProceedBtn";
import { colors } from "constants/Colors";

import { useRoute } from "@react-navigation/native";
import UploadImageBtn from "components/button/UploadImageBtn";

const UploadDocs = () => {
  const [document, setDocument] = useState({
    governmentId: "",
    BirthCert: "",
    CertificateOfReg: "",
  });
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);

  const isFieldEmpty = (document) => {
    for (const key in document) {
      if (document[key] === "") {
        return true;
      }
    }
    return false;
  };

  const newObject = { ...data, document: document };
  console.log(JSON.stringify(newObject, null, 2));

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
      <ProceedBtn
        data={newObject}
        disable={isFieldEmpty(document)}
        contProps={{
          marginBottom: 30,
          marginTop: 10,
          backgroundColor: colors.blue.slitedark,
        }}
        btnText={"Proceed"}
        path={"rent-my-vehicle/success-screen"}
      />
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
});
