import { StyleSheet, ScrollView } from "react-native";
import React from "react";

//layout
import MainLayout from "layouts/MainLayout";
import RentingItem from "components/rent_a_vehicle/RentingItem";

const RentingApplication = () => {
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <RentingItem />
      </ScrollView>
    </MainLayout>
  );
};

export default RentingApplication;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "110%",
    marginTop: -23,
  },
});
