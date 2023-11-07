import React, { useState } from "react";
import { StyleSheet, Image, ScrollView, View, Button } from "react-native";
//layout
import MainLayout from "layouts/MainLayout";

import { useRoute } from "@react-navigation/native";
import Text from "components/ThemedText";
import ResultItem from "components/rent_a_vehicle/ResultItem";
import ChangeLocation from "components/rent_a_vehicle/ChangeLocation";
//Icon
import logo from "assets/icons/logo.png";

//hook
import { useUserContext } from "context/UserContext";

const ResultScreen = () => {
  const route = useRoute();
  const { user, setUser } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);

  const currentCity = user.address.municipality.name;

  //prev data
  const { result, dateTime } = JSON.parse(route.params?.data);

  // Filter the results based on the current city
  const filteredResults = result
    ? result.filter(
        (item) => item.pickupLocation.municipality.name === currentCity
      )
    : [];

  // Calculate the total number of pages based on the filtered results
  const itemsPerPage = 5;
  const totalItems = filteredResults.length;

  // Calculate the start and end indices based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Paginated results
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ChangeLocation city={currentCity} setUser={setUser} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Available Vehicles For Rent</Text>
          <Image style={styles.logoIcon} source={logo} />
        </View>
        <View style={styles.resultContainer}>
          {paginatedResults && paginatedResults.length > 0 ? (
            paginatedResults.map((resultItem) => (
              <ResultItem
                key={resultItem.id}
                resultItem={resultItem}
                dateTime={dateTime}
              />
            ))
          ) : (
            <Text style={[styles.label, { alignSelf: "center" }]}>
              No result found!
            </Text>
          )}
        </View>
        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <Button
            title="<"
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
          />
          <Text style={styles.pageNumber}>{currentPage}</Text>
          <Button
            title=">"
            disabled={endIndex >= totalItems}
            onPress={() => setCurrentPage(currentPage + 1)}
          />
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  pageNumber: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});
