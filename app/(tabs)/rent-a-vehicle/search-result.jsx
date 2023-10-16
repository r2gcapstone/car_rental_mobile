import React, { useEffect } from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
//layout
import MainLayout from "layouts/MainLayout";

import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import ResultItem from "components/rent_a_vehicle/ResultItem";
import ChangeLocation from "components/rent_a_vehicle/ChangeLocation";
//Icon
import logo from "assets/icons/logo.png";

import { useUserContext } from "context/UserContext";

const ResultScreen = () => {
  const route = useRoute();
  const user = useUserContext().user;

  //prev data
  const { result, dateTime } = JSON.parse(route.params?.data);
  const { searchResults } = result;

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ChangeLocation address={user.address} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Available Vehicles For Rent</Text>
          <Image style={styles.logoIcon} source={logo} />
        </View>
        <View style={styles.resultContainer}>
          {searchResults ? (
            searchResults.map((resultItem) => (
              <ResultItem
                key={resultItem.id}
                resultItem={resultItem}
                dateTime={dateTime}
              />
            ))
          ) : (
            <Text style={{ alignSelf: "center" }}>No result found!</Text>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 21,
    paddingBottom: 10,
    paddingTop: 20,
  },

  logoIcon: {
    width: 30,
    height: 36,
  },
  resultContainer: {
    flex: 1,
    width: "100%",
    gap: 11,
  },
});
