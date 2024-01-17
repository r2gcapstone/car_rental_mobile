import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MainLayout from "layouts/MainLayout";
import Header from "components/home/Header";
import Text from "components/ThemedText";
import { useUserContext } from "context/UserContext";
import useSentenceCase from "hooks/useSentenceCase";
import { colors } from "constants/Colors";
import { router } from "expo-router";
import formatDate from "utils/formatDate";

export default function Profile() {
  const { user } = useUserContext();
  const { toSentenceCase } = useSentenceCase();

  const {
    firstName,
    lastName,
    address: { province, municipality, barangay, subdivision, street },
    email,
    imageUrl,
    mobileNumber,
    dateCreated,
  } = user;

  const newAddress = [
    street,
    subdivision,
    barangay,
    municipality.name,
    province.name,
  ]
    .filter(Boolean)
    .join(", ");

  const dataArray = [
    { id: 0, label: "Full Name :", value: firstName + " " + lastName },
    { id: 1, label: "Email :", value: email },
    { id: 2, label: "Mobile Number :", value: mobileNumber },
    { id: 3, label: "Address :", value: newAddress },
  ];

  const handleUpdateBtn = () => {
    router.push("profile/update-info");
  };
  const handleChangePassBtn = () => {
    router.push("profile/change-pass");
  };
  return (
    <MainLayout>
      {user && (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.container}>
            <View style={styles.row}>
              {imageUrl ? (
                <Image style={styles.avatar} source={{ uri: imageUrl }} />
              ) : (
                <Text
                  style={[
                    styles.avatar,
                    {
                      textAlign: "center",
                      backgroundColor: "#000",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                ></Text>
              )}

              <Text style={styles.nameText}>
                {toSentenceCase(firstName) + " " + toSentenceCase(lastName)}
              </Text>
              <Text style={styles.text}>Account Created :</Text>
              {dateCreated && (
                <Text style={styles.text}>{formatDate(dateCreated)}</Text>
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Account information</Text>
              </View>
              {dataArray.map(({ id, label, value }) => (
                <View key={id} style={styles.valueRow}>
                  <Text style={styles.label}>{label}</Text>
                  <Text style={styles.value}>{toSentenceCase(value)}</Text>
                </View>
              ))}
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={handleUpdateBtn}
                style={[styles.btn, { backgroundColor: colors.blue.primary }]}
              >
                <Text style={styles.btn1Text}>Update Account Information</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleChangePassBtn}
                style={[
                  styles.btn,
                  {
                    backgroundColor: colors.red.primary,
                  },
                ]}
              >
                <Text>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  row: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  nameText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "300",
  },
  headerContainer: {
    width: "100%",
    paddingBottom: 4,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  valueRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
  },
  value: {
    width: "50%",
    textAlign: "right",
    right: 0,
    color: colors.white[1],
  },
  label: {},
  btn: {
    backgroundColor: "#000",
    height: 44,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
});
