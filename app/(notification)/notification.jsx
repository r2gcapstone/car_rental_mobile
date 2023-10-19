import { StyleSheet } from "react-native";
import React from "react";
import NotificationList from "components/NotificationList";

//layout
import MainLayout from "layouts/MainLayout";

const Notification = () => {
  return (
    <MainLayout>
      <NotificationList></NotificationList>
    </MainLayout>
  );
};

export default Notification;

const styles = StyleSheet.create({});
