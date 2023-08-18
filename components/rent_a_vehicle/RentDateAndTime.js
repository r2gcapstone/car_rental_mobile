import { colors } from "constants/Colors";
import React, { useState } from "react";
import { Button, StyleSheet, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";

const RentDateTimePicker = () => {
  const [startRentDate, setStartRentDate] = useState(new Date());
  const [startRentTime, setStartRentTime] = useState(new Date());
  const [endRentDate, setEndRentDate] = useState(new Date());
  const [endRentTime, setEndRentTime] = useState(new Date());

  const handleStartRentDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startRentDate;
    setStartRentDate(currentDate);
  };

  const handleStartRentTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startRentTime;
    setStartRentTime(currentTime);
  };

  const handleEndRentDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endRentDate;
    setEndRentDate(currentDate);
  };

  const handleEndRentTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endRentTime;
    setEndRentTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Start Rent Date:</Text>
          <View style={styles.dateContainer}>
            <DateTimePicker
              themeVariant="light"
              value={startRentDate}
              style={styles.date}
              accentColor={colors.textColor.dark2}
              mode="date"
              onChange={handleStartRentDateChange}
            />
            <Image
              source={require("assets/icons/calendar.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>End Rent Date:</Text>
          <View style={styles.dateContainer}>
            <DateTimePicker
              themeVariant="light"
              value={endRentDate}
              style={styles.date}
              accentColor={colors.textColor.dark2}
              mode="date"
              onChange={handleEndRentDateChange}
            />
            <Image
              source={require("assets/icons/calendar.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Start Rent Time:</Text>
          <View style={styles.dateContainer}>
            <DateTimePicker
              themeVariant="light"
              value={startRentTime}
              style={styles.date}
              accentColor={colors.textColor.dark2}
              mode="time"
              onChange={handleStartRentTimeChange}
            />
            <Image
              source={require("assets/icons/clock.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>End Rent Time:</Text>
          <View style={styles.dateContainer}>
            <DateTimePicker
              themeVariant="light"
              value={endRentTime}
              style={styles.date}
              accentColor={colors.textColor.dark2}
              mode="time"
              onChange={handleEndRentTimeChange}
            />
            <Image
              source={require("assets/icons/clock.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.blue.slitedark,
    gap: 4,
  },
  row: {
    gap: 8,
    flexDirection: "col",
    alignItems: "flex-start",
    backgroundColor: colors.blue.slitedark,
  },
  label: {
    fontSize: 12,
  },
  date: {
    // backgroundColor: colors.white[0],
    fontSize: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    gap: -6,
    backgroundColor: colors.white[0],
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default RentDateTimePicker;
