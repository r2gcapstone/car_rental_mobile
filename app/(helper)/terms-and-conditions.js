import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

//components
import View from "../../components/ThemedView";
import Text from "../../components/ThemedText";
import { BackButton } from "../../components/BackButton";

//constants
import { colors } from "../../constants/Colors";

export default function terms() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeView}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>
              Terms and Condition of
              <Text style={{ fontWeight: "bold" }}> R2G</Text> Car Rental Mobile
              App
            </Text>
          </View>

          <View style={styles.contextContainer}>
            <Text style={styles.context}>
              Please read these Terms and Conditions carefully before using the
              R2G Car Rental Mobile App
            </Text>
            <Text style={styles.context}>
              By accessing or using the App, you agree to be bound by these
              Terms. If you do not agree with any part of these Terms, you
              should not use the App.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>1. Acceptance of Terms </Text> - by
              using the R2G Car Rental Mobile App, you acknowledge that you have
              read, understood, and agree to be bound by these Terms and any
              additional terms and conditions that may apply to specific
              features of the App. These Terms constitute a legally binding
              agreement between you and R2G Car Rental Mobile App.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>2. Registration Process </Text> -
              to use the App, you must register and create an account. During
              the registration process, you will be required to provide accurate
              and complete information, including but not limited to your name,
              contact details, email address, and payment information.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>3. Account Security </Text> - you
              are responsible for maintaining the confidentiality of your
              account information, including your username and password. You
              agree to notify R2G Car Rental Mobile App immediately of any
              unauthorized use of your account or any other breach of security.
              R2G Car Rental Mobile App will not be liable for any loss or
              damage arising from your failure to comply with this security
              obligation.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>
                4. Finding Available Vehicles
              </Text>
              - R2G Car Rental Mobile App provides a service to help users find
              available vehicles for rent based on their current location. While
              we strive to provide accurate and up-to-date information, we do
              not guarantee the availability or accuracy of the listings or the
              condition, quality, safety, or legality of the vehicles listed on
              the App. It is your responsibility to verify the details of the
              rental vehicle before making any commitments.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>
                5. Vehicle Advertising Services
              </Text>
              - R2G Car Rental Mobile App allows users to advertise their own
              vehicles for rent on the platform. By advertising a vehicle, you
              confirm that you are the lawful owner of the vehicle, possess all
              necessary licenses, permits, and insurance required for renting
              the vehicle, and that the vehicle is in a safe and roadworthy
              condition. R2G Car Rental Mobile App reserves the right to remove
              any vehicle listings that do not meet these requirements or
              violate any applicable laws or regulations.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>6. Compliance with Laws </Text> -
              You will comply with all applicable laws, rules, and regulations
              in connection with your use of the App, including but not limited
              to laws related to vehicle rental, taxation, and data privacy.
            </Text>
            <Text style={styles.context}>
              <Text style={styles.titleText}>7. Prohibited Activities </Text> -
              Violating any laws or regulations; Interfering with the App's
              operation or disrupting the services provided; Impersonating any
              person or entity or falsely representing your affiliation with any
              person or entity; Harassing, stalking, or threatening other users
              of the App; Uploading or transmitting any viruses, malware, or any
              other malicious code.
            </Text>

            <Text style={styles.context}>
              <Text style={styles.titleText}>8. Intellectual Property</Text> -
              The R2G Car Rental Mobile App, including its content, features,
              and functionality, is owned by R2G Car Rental Mobile App and is
              protected by copyright, trademark, and other intellectual property
              laws. You may not copy, modify, distribute, or create derivative
              works based on the App without prior written consent from R2G Car
              Rental Mobile App.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: colors.blue.slitedark },
            ]}
            onPress={BackButton}
          >
            {/* <Link href={"/sign-up"}> */}
            <Text style={styles.buttonText}>Go back</Text>
            {/* </Link> */}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  safeView: {
    flex: 1,
    width: "100%",
  },
  contextContainer: {
    paddingBottom: 20,
  },
  context: {
    paddingBottom: 20,
  },
  titleText: {
    fontWeight: "bold",
  },
  logoContainer: {
    height: "auto",
    marginVertical: 40,
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 89,
    height: 107,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 25,
  },
  backButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
