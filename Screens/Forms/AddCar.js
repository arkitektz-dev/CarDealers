import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppPicker from "../../Component/Picker/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { ScrollView } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { screenWidth } from "../../Global/Dimension";
import { TouchableOpacity } from "react-native";
import AppCheckBox from "../../Component/AppCheckbox";
import { Text, FlatList } from "react-native";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
  const [checkbox, setCheckbox] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [dropdownValues, setDropDownValues] = useState({
    Assemble: "",
    EngineCapacity: "",
    Engine: "",
    City: "",
    Model: "",
    Make: "",
    Year: "",
    Version: "",
    registrationCity: "",
    ExteriorColor: "",
    InteriorColor: "",
    Description: "",
    mileage: "",
    price: "",
  });
  const items = [
    { label: "1000 Km", value: 1 },
    { label: "2000 Km", value: 2 },
    { label: "3000 Km", value: 3 },
  ];
  const color = [
    { label: "red", value: 1 },
    { label: "blue", value: 2 },
    { label: "yellow", value: 3 },
  ];
  const city = [
    { label: "Karachi", value: 1 },
    { label: "Lahore", value: 2 },
    { label: "Islamabad", value: 3 },
  ];
  const type = [
    { label: "Automatic", value: 1 },
    { label: "Manual", value: 2 },
  ];
  const year = [
    { label: "2000", value: 1 },
    { label: "2002", value: 2 },
    { label: "2009 ", value: 3 },
  ];
  const company = [
    { label: "Suzuki", value: 1 },
    { label: "Toyota", value: 2 },
    { label: "Honda", value: 3 },
  ];
  const onChangeHandler = (item) => {
    if (checkbox.includes(item)) {
      const a = checkbox.filter((c) => c !== item);
      setCheckbox(a);
    } else {
      setCheckbox([...checkbox, item]);
    }
  };
  const checkboxData = ["ted", "asdas"];
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <AppCheckBox
          status={checkbox.includes(item) ? "checked" : "unchecked"}
          onPress={() => onChangeHandler(item)}
        />
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "800",
          }}
          key={(item, index) => index.toString()}
        >
          {item}
        </Text>
      </View>
    );
  };
  const onPressHandler = () => {
    firestore()
      .collection("Car")
      .add(dropdownValues)
      .then(() => {
        alert("User Added");
      });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        width: "100%",
      }}
    >
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          left: 10,
          top: 10,
          backgroundColor: "red",
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
        }}
      ></TouchableOpacity> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View style={{ maxWidth: "70%" }}>
            <AppPicker
              items={items}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Assemble: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Assemble"
              selectedItem={dropdownValues.Assemble}
              width="80%"
            />
            <FlatList
              data={checkboxData}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            />
            <AppPicker
              items={type}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, EngineCapacity: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Engine Type"
              selectedItem={dropdownValues.EngineCapacity}
              width="80%"
            />
            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, City: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select City"
              selectedItem={dropdownValues.City}
              width="80%"
            />

            <AppPicker
              items={company}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Make: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Company"
              selectedItem={dropdownValues.Make}
              width="80%"
            />
            <AppPicker
              items={year}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Model: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Model"
              selectedItem={dropdownValues.Model}
              width="80%"
            />
            <AppPicker
              items={year}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Version: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Year"
              selectedItem={dropdownValues.Version}
              width="80%"
            />
            <AppPicker
              items={year}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Year: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Version"
              selectedItem={dropdownValues.Year}
              width="80%"
            />
            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, City: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select RegistrationCity"
              selectedItem={dropdownValues.City}
              width="80%"
            />
            <AppPicker
              items={color}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, InteriorColor: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Interior Color"
              selectedItem={dropdownValues.InteriorColor}
              width="80%"
            />
            <AppPicker
              items={color}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, ExteriorColor: item })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Exterior Color"
              selectedItem={dropdownValues.ExteriorColor}
              width="80%"
            />
            <AppTextInput
              label={"Description"}
              multiline={true}
              onChangeHandler={(e) =>
                setDropDownValues({ ...dropdownValues, Description: e })
              }
            />
            <AppTextInput
              label={"Mileage"}
              keyboardType={"number-pad"}
              onChangeHandler={(e) =>
                setDropDownValues({ ...dropdownValues, mileage: e })
              }
            />
            <AppTextInput
              label={"Price"}
              keyboardType={"number-pad"}
              onChangeHandler={(e) =>
                setDropDownValues({ ...dropdownValues, price: e })
              }
            />

            <Button
              style={styles.background}
              title="Submit"
              onPressHandler={onPressHandler}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AddCar);
const styles = StyleSheet.create({
  background: {
    alignSelf: "center",
    backgroundColor: "red",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
  },
  Picker: {
    borderRadius: 25,

    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f8f4f4",
    alignItems: "center",
    alignSelf: "center",
  },
  dropdown: {
    borderRadius: 20,
    backgroundColor: "#f8f4f4",
  },
});
