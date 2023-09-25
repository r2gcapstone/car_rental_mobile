import { Image, StyleSheet, View } from "react-native";
import Text from "components/ThemedText";
import useSentenceCase from "hooks/useSentenceCase";
import star from "assets/icons/star.png";

const Reviews = ({
  reviewItem: { name, comment, imageUrl, dateCreated, rating },
}) => {
  const { toSentenceCase } = useSentenceCase();

  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        {imageUrl && <Image style={styles.avatar} source={{ uri: imageUrl }} />}
        <View style={styles.content}>
          <Text style={styles.textName}>{toSentenceCase(name)}</Text>
          <Text style={styles.text}>{toSentenceCase(comment)}</Text>
        </View>
      </View>
      <View style={styles.col2}>
        <View style={styles.ratingContainer}>
          <Image style={styles.icon} source={star} />
          <Text style={styles.textRating}>{rating + `.0`}</Text>
        </View>
        <Text style={styles.textDate}>{dateCreated}</Text>
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  col1: {
    flex: 2,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  col2: {
    flex: 1.5,
    gap: 4,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  content: {
    gap: 4,
  },
  text: {
    fontWeight: "normal",
    fontSize: 12,
    opacity: 0.8,
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textDate: {
    fontSize: 11,
    opacity: 0.7,
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
