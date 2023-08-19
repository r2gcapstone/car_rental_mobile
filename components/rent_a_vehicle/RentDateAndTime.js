import React, { useState } from "react";
import { Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
import View from "components/ThemedView";
import Text from "components/ThemedText";

import { colors } from "constants/Colors";

const RentDateTimePicker = () => {
  const initialDateTimeValues = {
    startRentDate: new Date(),
    startRentTime: new Date(),
    endRentDate: new Date(),
    endRentTime: new Date(),
  };

  const [dateTimeValues, setDateTimeValues] = useState(initialDateTimeValues);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const handleDateTimeChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      setSelectedMode(null);
      setSelectedField(null);
      return;
    }

    const updatedValues = { ...dateTimeValues };
    updatedValues[selectedField] = selectedDate;
    setDateTimeValues(updatedValues);
    setSelectedMode(null);
    setSelectedField(null);
  };

  const renderDateTimePicker = (field, mode) => {
    return (
      <DateTimePicker
        themeVariant="light"
        value={dateTimeValues[field]}
        style={styles.date}
        accentColor="#000"
        mode={mode}
        onChange={(event, selectedDate) =>
          handleDateTimeChange(event, selectedDate)
        }
      />
    );
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const renderDateTimeField = (label, field, mode) => {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => {
            setSelectedMode(mode);
            setSelectedField(field);
          }}
        >
          <Text style={styles.dateText}>
            {formatDate(dateTimeValues[field])}
          </Text>

          <Image
            source={require("assets/icons/calendar.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        {selectedMode === mode &&
          selectedField === field &&
          renderDateTimePicker(field, mode)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderDateTimeField("Start Rent Date", "startRentDate", "date")}
        {renderDateTimeField("End Rent Date", "endRentDate", "date")}
      </View>
      <View style={styles.row}>
        {renderDateTimeField("Start Rent Time", "startRentTime", "time")}
        {renderDateTimeField("End Rent Time", "endRentTime", "time")}
      </View>
    </View>
  );
};

// Rest of the styles and export remain unchanged

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
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: colors.blue.slitedark,
  },
  label: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: colors.dark2,
    paddingHorizontal: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
