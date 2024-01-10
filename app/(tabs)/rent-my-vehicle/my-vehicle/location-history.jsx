import { StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";

import { useLoadingAnimation } from "hooks/useLoadingAnimation";
//icon
import peso from "assets/icons/pesoWhite.png";

//layout
import MainLayout from "layouts/MainLayout";

const LocationHistory = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();

  const { carId } = data;

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContaniner}>
          <Text style={styles.header}>Vehicle Renter Information</Text>
        </View>
        <Text style={styles.text}>
          This will display the last five locations of the vehicle.
        </Text>
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContaniner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default LocationHistory;
