import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import ApplicantsList from "components/rent_my_vehicle/ApplicantsList";

//layout
import MainLayout from "layouts/MainLayout";

const RentingApplication = () => {
  return (
    <MainLayout>
      <ApplicantsList />
    </MainLayout>
  );
};

export default RentingApplication;

const styles = StyleSheet.create({});
