import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "constants/Colors";
import Text from "components/ThemedText";

const DropDown2 = ({ data, setData, options, label, name, id, setId }) => {
  // Define a function to update the id state based on the selected option
  const updateIdState = (selectedOption) => {
    if (selectedOption) {
      const updatedId = { ...id };
      updatedId[`${name}Id`] = selectedOption[`${name}_id`];
      setId(updatedId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        {options && (
          <Picker
            selectedValue={data[name]}
            onValueChange={(itemValue) => {
              // Update the data state with the selected value
              setData({ ...data, [name]: itemValue });

              // Find the corresponding option based on the selected value
              const selectedOption = options.find(
                (option) => option[name + "_name"] === itemValue
              );

              // Update the id state with the selected option's ID
              updateIdState(selectedOption);
            }}
            style={styles.picker}
          >
            <Picker.Item
              style={styles.label2}
              color="#0553AF"
              label={"Select " + [name]}
              value={""}
            />

            {options.map((option) => (
              <Picker.Item
                key={option[name + "_id"]}
                label={option[name + "_name"]}
                value={option[name + "_name"]}
              />
            ))}
          </Picker>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  label2: {
    color: "#000",
    borderStartColor: "#000",
    shadowOpacity: 0.3,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white[1],
    borderRadius: 8,
    height: 40,
  },
  picker: {
    width: "100%",
    borderRadius: 100,
    color: "#000",
  },
});

export default DropDown2;
