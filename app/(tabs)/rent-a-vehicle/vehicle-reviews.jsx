import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import useSentenceCase from "hooks/useSentenceCase";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import { useUserContext } from "context/UserContext";

//layout
import MainLayout from "layouts/MainLayout";
//Icon
import star from "assets/icons/star.png";
import ReviewItem from "components/rent_a_vehicle/ReviewItem";
import { getReviews } from "api/cars";

const VehicleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data || "{}");
  const { toSentenceCase } = useSentenceCase();
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const { user } = useUserContext();
  let stillOwnerName = user.firstName + " " + user.lastName;

  const {
    vehicleDetails: { vehicleName },
    imageUrls: { front },
    ownerName,
    carId,
    mode,
  } = data;

  useEffect(() => {
    showLoading();
    const fetchReviews = async () => {
      try {
        const result = await getReviews(carId);
        setReviews(result);
        hideLoading();
      } catch (error) {
        hideLoading();
      }
    };

    fetchReviews();
  }, []);

  //compute rating average
  let sum = 0;
  reviews.forEach((item) => {
    sum += +item.rating;
  });
  let average = sum / reviews.length;

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: front }} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.carName}>
            {toSentenceCase(vehicleName || "")}
          </Text>
          <Text style={styles.label}>
            Owned by :{" "}
            <Text style={styles.value}>
              {toSentenceCase(mode === "update" ? stillOwnerName : ownerName)}
            </Text>
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.label}>General Rating Average: </Text>
            <Text style={styles.textRating}>
              {average
                ? average
                : ((<Image style={styles.icon} source={star} />),
                  (
                    <Text
                      style={{
                        color: "#C60909",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      Rating & review unavailable
                    </Text>
                  ))}
            </Text>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderColor: "#fff",
              paddingBottom: 10,
            }}
          >
            <Text style={styles.header}>Ratings & Reviews</Text>
          </View>
          {reviews &&
            reviews.map((reviewItem, index) => (
              <ReviewItem key={index} reviewItem={reviewItem} />
            ))}
        </View>
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

export default VehicleReviews;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: -23,
  },
  imageContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#757575",
    alignSelf: "center",
  },
  detailContainer: {
    gap: 2,
  },
  carName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  value: { fontWeight: "bold" },
  header: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewContainer: {
    marginTop: 30,
  },
  ratingContainer: {
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  textRating: {
    fontSize: 16,
    color: "#F9B44D",
  },
  icon: {
    width: 28,
    height: 28,
  },
});
