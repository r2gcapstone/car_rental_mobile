import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Text from "components/ThemedText";
import { AirbnbRating } from "react-native-ratings";
import { postReview } from "api/reviews";
//hook
import { useUserContext } from "context/UserContext";

//layout
import MainLayout from "layouts/MainLayout";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";

const initialState = {
  userName: "",
  comment: "",
  rating: 1,
  imageUrl: null,
};

const WriteReview = () => {
  const route = useRoute();
  const { user } = useUserContext();
  const [review, setReview] = useState(initialState);

  //prev data
  const data = JSON.parse(route.params?.data);
  const {
    imageUrl,
    vehicleDetails: { vehicleName },
    ownerName,
    carId,
    docId,
  } = data;

  const pushReview = async (data) => {
    try {
      const newData = {
        ...data,
        imageUrl: user.imageUrl,
        userName: user.firstName,
        carId: carId,
      };
      const result = await postReview(newData, docId);
      if (!result.error) {
        router.push("/(notification)/notification");
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log(JSON.stringify(review, null, 2));
  }, [review]);

  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.img} source={{ uri: imageUrl }}></Image>
            <Text style={styles.carName}>{vehicleName}</Text>
            <Text style={styles.text}>
              Owner: <Text style={styles.ownerName}>{ownerName}</Text>
            </Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.header}>Your Rating : </Text>
            <AirbnbRating
              showRating={false}
              size={30}
              defaultRating={1}
              starContainerStyle={{ gap: 4 }}
              onFinishRating={(rating) =>
                setReview({ ...review, rating: rating })
              }
            />
          </View>

          <View style={styles.row3}>
            <Text style={styles.header}>Add Comment :</Text>
            <View style={styles.textContainer}>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Write a comment..."
                onChangeText={(comment) =>
                  setReview({ ...review, comment: comment })
                }
                value={review.comment}
              />
            </View>
          </View>
          <View style={styles.row4}>
            <TouchableOpacity
              onPress={() => pushReview(review)}
              style={styles.btnContainer}
            >
              <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    marginTop: -23,
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  img: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
  row: {
    alignItems: "center",
    gap: 4,
    paddingTop: 20,
  },
  row2: {
    alignItems: "flex-start",
    gap: 20,
    // backgroundColor: "#000",
  },
  row3: {
    flex: 1,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#fff",
    gap: 4,
  },
  row4: {
    flex: 1,
    alignItems: "center",
    height: 200,
  },
  text: {
    fontSize: 14,
  },
  carName: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9A04",
  },
  ownerName: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
  },
  input: {
    borderColor: "gray",
    paddingLeft: 10,
  },
  textContainer: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  btnContainer: {
    backgroundColor: "#0029FF",
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
  },
});
