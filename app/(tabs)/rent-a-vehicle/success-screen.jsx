import { StyleSheet, Text } from "react-native";
import React from "react";

//layout
import MainLayout from "layouts/MainLayout";
//components
import Message from "components/Message";

export default function SuccessScreen() {
  return (
    <MainLayout>
      <Message
        path="rent-a-vehicle/renting-application"
        message="You have successfully applied for booking"
        subMessage={() => (
          <Text style={styles.caption}>
            Go to
            <Text style={styles.boldCaption}> My Application for Renting </Text>
            to view your application details
          </Text>
        )}
        btnText="Okay"
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  caption: {
    fontStyle: "italic",
  },
  boldCaption: {
    fontWeight: "bold",
  },
});
