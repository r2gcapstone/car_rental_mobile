import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllSubscription } from "api/subscription";
import { useLoadingAnimation } from "hooks/useLoadingAnimation";
import useSentenceCase from "hooks/useSentenceCase";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
const { toSentenceCase } = useSentenceCase();

//layout
import MainLayout from "layouts/MainLayout";

const MySubscription = () => {
  const [data, setData] = useState();
  const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
  const getSubscription = async () => {
    try {
      showLoading();
      const result = await getAllSubscription();
      hideLoading();
      if (!result.error) {
        setData(result);
      }
    } catch (error) {
      hideLoading();
      alert(error);
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);
  return (
    <MainLayout>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {data &&
            data.map(({ carImage, vehicleName, duration }, index) => (
              <View
                key={index}
                style={[
                  styles.rowData,
                  index === data.length - 1 && styles.lastItem,
                ]}
              >
                <View style={styles.row}>
                  <Image style={styles.img} source={{ uri: carImage }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.header}>
                      {toSentenceCase(vehicleName)}
                    </Text>
                    <View style={styles.value}>
                      <Text style={styles.label}>Remaining Subscription :</Text>
                      <Text style={styles.value}> {duration} Days(s)</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <LoadingComponent />
    </MainLayout>
  );
};

export default MySubscription;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: -23,
    width: "100%",
  },
  container: {
    flex: 1,
    marginVertical: 20,
    gap: 10,
  },
  rowData: {
    height: 80,
    flexDirection: "row",
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.white[2],
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    flexDirection: "row",
    fontWeight: "bold",
    borderBottomColor: colors.white[1],
  },
});
