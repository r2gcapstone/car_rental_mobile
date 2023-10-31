import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
import Text from "components/ThemedText";

import { colors } from "constants/Colors";

const RentDateTimePicker = ({ dateTimeValues, setDateTimeValues }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const handleDateTimeChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      setSelectedMode(null);
      setSelectedField(null);
      return;
    }

    let updatedDate;
    let startDate, endDate;

    if (selectedField === "startRentTime") {
      startDate = new Date(dateTimeValues.startRentDate);
      startDate.setHours(selectedDate.getHours());
      startDate.setMinutes(selectedDate.getMinutes());

      updatedDate = startDate;
    } else if (selectedField === "endRentTime") {
      endDate = new Date(dateTimeValues.endRentDate);
      endDate.setHours(selectedDate.getHours());
      endDate.setMinutes(selectedDate.getMinutes());

      updatedDate = endDate;
    } else {
      updatedDate = selectedDate;
    }

    const updatedValues = { ...dateTimeValues };
    if (startDate) {
      updatedValues.startRentDate = startDate;
    } else if (endDate) {
      updatedValues.endRentDate = endDate;
    }

    updatedValues[selectedField] = updatedDate;
    setDateTimeValues(updatedValues);
    setSelectedMode(null);
    setSelectedField(null);
  };

  const renderDateTimePicker = (mode, field, icon) => {
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

  const rows = [
    [
      {
        label: "Start Rent Date",
        field: "startRentDate",
        mode: "date",
        icon: "calendar",
      },
      {
        label: "Start Rent Time",
        field: "startRentTime",
        mode: "time",
        icon: "clock",
      },
    ],
    [
      {
        label: "End Rent Date",
        field: "endRentDate",
        mode: "date",
        icon: "calendar",
      },
      {
        label: "End Rent Time",
        field: "endRentTime",
        mode: "time",
        icon: "clock",
      },
    ],
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map(({ label, field, mode, icon }) => (
            <View key={field} style={styles.column}>
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
                    : dateTimeValues[field].toLocaleDateString()}
                </Text>
                <Image
                  source={
                    icon === "calendar"
                      ? require("assets/icons/calendar.png")
                      : require("assets/icons/clock.png")
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
              {selectedMode === mode &&
                selectedField === field &&
                renderDateTimePicker(mode, field, icon)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.blue.slitedark,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    width: "48.5%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 12,
    marginBottom: 5,
    marginRight: 4,
  },
  dateText: {
    fontSize: 14,
    paddingHorizontal: 8,
    color: colors.textColor.dark2,
  },
  dateContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white[1],
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default RentDateTimePicker;
