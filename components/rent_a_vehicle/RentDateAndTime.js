import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
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

  const formatDate = (date, isTime = false) => {
    if (isTime) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  };

  const fields = [
    { label: "Start Rent Date", field: "startRentDate", mode: "date" },
    { label: "End Rent Date", field: "endRentDate", mode: "date" },
    { label: "Start Rent Time", field: "startRentTime", mode: "time" },
    { label: "End Rent Time", field: "endRentTime", mode: "time" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {fields.slice(0, 2).map(({ label, field, mode }) => (
          <View key={field} style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => {
                setSelectedMode(mode);
                setSelectedField(field);
              }}
            >
              <Text style={styles.dateText}>
                {mode === "time"
                  ? dateTimeValues[field].toLocaleTimeString()
                  : formatDate(dateTimeValues[field])}
              </Text>
              <Image
                source={require("assets/icons/calendar.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {selectedMode === mode && selectedField === field && (
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
            )}
          </View>
        ))}
      </View>
      <View style={styles.column}>
        {fields.slice(2).map(({ label, field, mode }) => (
          <View key={field} style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => {
                setSelectedMode("time");
                setSelectedField(field);
              }}
            >
              <Text style={styles.dateText}>
                {formatDate(dateTimeValues[field], true)}
              </Text>
              <Image
                source={require("assets/icons/clock.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            {selectedMode === mode && selectedField === field && (
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
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue.slitedark,
    gap: 10,
  },
  column: {
    flexDirection: "column",
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: "col",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 12,
    marginBottom: 5,
    marginRight: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.dark2,
    paddingHorizontal: 8,
  },
  dateContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.white[0],
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default RentDateTimePicker;
