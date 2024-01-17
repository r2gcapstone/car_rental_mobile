import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
//icon
import logo from "assets/icons/logo.png";
//layout
import MainLayout from "layouts/MainLayout";
import RulesRegulationModal from "components/rent_a_vehicle/modal/RulesRegulationModal";

const RulesRegulation = () => {
  const route = useRoute();
  //prev data
  const data = JSON.parse(route.params?.data);
  const [modal, setModal] = useState(false);
  const handleOnChange = () => {
    setModal((prev) => !prev);
  };

  const dataArray = [
    {
      id: 1,
      label: "Geographical Limitation & GPS:",
      text1:
        "Your mobile device must have an internet connection as possible since we will use this to track your vehicle.",
      text2:
        "The vehicle renter must only travel within the vicinity of Negros Occidental, Philippines.",
      text3:
        "Traveling outside the designated area without prior approval from the company and the vehicle owner is strictly prohibited.",
    },
    {
      id: 2,
      label: "Vehicle Tracking:",
      text1:
        "For safety and security reasons, the company and the vehicle owner will track the location of the rented vehicle using GPS or other tracking technologies.",
      text2:
        "Traveling outside the designated area without prior approval from the company and the vehicle owner is strictly prohibited.",
    },
    {
      id: 3,
      label: "Pick-up and Drop-off:",
      text1:
        "The renter is required to meet the vehicle owner at the exact pick-up location, date, and time specified during the booking process.",
      text2:
        "Similarly, the vehicle must be returned to the exact drop-off location, date, and time as agreed upon.",
      text3:
        "Any changes to the pick-up or drop-off details must be communicated and approved by the vehicle owner.",
    },
    {
      id: 4,
      label: "Damage and Liability:",
      text1:
        "The vehicle renter is responsible for any damages that occur during the rental period, including accidents, collisions, and vandalism.",
      text2:
        "The renter must report any damages to the vehicle owner and the company immediately.",
      text3:
        "The renter will be liable for the repair costs and any other associated expenses for damages caused.",
    },
    {
      id: 5,
      label: "Fuel Policy:",
      text1:
        "If the vehicle was rented with a full tank of gasoline, the renter must return it with a full tank.",
      text2:
        "The renter is responsible for the fuel expenses during the rental period, except when stated otherwise by the vehicle owner or the company.",
    },
    {
      id: 6,
      label: "Compliance with Traffic Laws:",
      text1:
        "The renter must comply with all traffic laws and regulations while operating the rented vehicle.",
      text2:
        "Any fines, penalties, or violations incurred during the rental period will be the responsibility of the renter.",
    },
    {
      id: 7,
      label: "Care and Maintenance:",
      text1:
        "The renter must take reasonable care of the vehicle, ensuring it is kept clean and in the same condition as when rented.",
      text2:
        "Any mechanical issues or maintenance requirements should be reported to the vehicle owner or the company promptly.",
    },
  ];
  return (
    <MainLayout>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo}></Image>
        <Text style={styles.headerText}>
          Rules and Regulations for Renting a Vehicle
        </Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.caption}>
            The renter is hereby required to acknowledge and agree to the
            following rules and regulations prior to booking a vehicle through
            the 'R2G' application.
          </Text>
          {dataArray.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.num}>
                {item.id + "."} <Text style={styles.label}>{item.label}</Text>
              </Text>
              <Text style={styles.text}>{"      " + item.text1}</Text>
              <Text style={styles.text}>{"      " + item.text2}</Text>
              {item.text3 && (
                <Text style={styles.text}>{"    " + item.text3}</Text>
              )}
            </View>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleOnChange}>
            <Text style={styles.btnText}>Agree</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {modal && <RulesRegulationModal data={data} onClose={handleOnChange} />}
    </MainLayout>
  );
};

export default RulesRegulation;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: StatusBar.currentHeight,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 67,
    height: 80,
  },
  caption: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "col",
    gap: 4,
    marginVertical: 10,
  },
  num: {
    fontWeight: "bold",
  },
  text: {
    opacity: 0.9,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
  },
  btn: {
    width: "40%",
    height: 40,
    backgroundColor: colors.blue.strongblue,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
