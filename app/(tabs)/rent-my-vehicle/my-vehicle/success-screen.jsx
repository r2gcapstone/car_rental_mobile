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
        path="/"
        message="Please wait for the approval of your subscription"
        subMessage={() => <Text style={styles.caption}></Text>}
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
