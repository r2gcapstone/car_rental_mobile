import { Picker } from "@react-native-picker/picker";

const SubDropdown = ({ value, handleOnChange, vehicle, props }) => (
  <Picker
    {...props}
    selectedValue={value}
    onValueChange={(value) => handleOnChange(value)}
    dropdownIconColor={"#fff"}
    style={{
      backgroundColor: "#526D82",
      borderRadius: 10,
      color: "#fff",
    }}
  >
    <Picker.Item label="Choose a Vehicle" value=""></Picker.Item>
    {vehicle &&
      Object.values(vehicle).map((option, index) => {
        const {
          vehicleDetails: { vehicleName },
        } = option;
        return (
          <Picker.Item
            key={index}
            label={vehicleName}
            value={vehicleName}
          ></Picker.Item>
        );
      })}
  </Picker>
);

export default SubDropdown;
