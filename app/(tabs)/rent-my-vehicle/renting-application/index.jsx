import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import ApplicantsList from "components/rent_my_vehicle/ApplicantsList";

//layout
import MainLayout from "layouts/MainLayout";

const RentingApplication = () => {
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ApplicantsList />
      </ScrollView>
    </MainLayout>
  );
};

export default RentingApplication;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
});
