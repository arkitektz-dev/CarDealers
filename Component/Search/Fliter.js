import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Modal, Text, View, Dimensions } from "react-native";
import AppPicker from "../Pickers/Index";
import { Button } from "../../Component/Button/Index";
import { StyleSheet } from "react-native";
import { screenWidth } from "../../Global/Dimension";
import CategoryPickerItem from "../Picker/CategoryPickerItem";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const Filter = ({ modalVisible, toggleModal, props }) => {
  const [dropdownValues, setDropDownValues] = useState({
    Assemble: "",
    EngineCapacity: "",
    Engine: "",
    Features: [],
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
    { label: "Red", value: 1 },
    { label: "Blue", value: 2 },
    { label: "Black", value: 3 },
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
    { label: "2016", value: 3 },
  ];
  const company = [
    { label: "Suzuki", value: 1 },
    { label: "Toyota", value: 2 },
    { label: "Honda", value: 3 },
  ];

  return (
    <View>
      <Modal visible={modalVisible} animationType={"slide"}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
            }}
          >
            {/* <AppPicker
              placeholder={"Select Assembly"}
              options={items}
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Assemble: item })
              }
              selectedItem={dropdownValues.Assemble}
            /> */}
            <AppPicker
              items={type}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Assemble: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Assembly"
              selectedItem={dropdownValues.Assemble}
              width="80%"
            />
            <AppPicker
              items={items}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, mileage: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Mileage"
              selectedItem={dropdownValues.mileage}
              width="80%"
            />
            <AppPicker
              items={color}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, ExteriorColor: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Color"
              selectedItem={dropdownValues.ExteriorColor}
              width="80%"
            />
            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, City: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select City"
              selectedItem={dropdownValues.City}
              width="80%"
            />
            <AppPicker
              items={year}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Year: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Year"
              selectedItem={dropdownValues.Year}
              width="80%"
            />
            <AppPicker
              items={company}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Make: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Company"
              selectedItem={dropdownValues.Make}
              width="80%"
            />
            {/* <AppPicker
              placeholder={"Select Engine Capacity"}
              options={items}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, EngineCapacity: value })
              }
            />
            <AppPicker
              placeholder={"Select Engine Type"}
              options={type}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, Engine: value })
              }
            />
            <AppPicker
              placeholder={"Select Features"}
              options={items}
              onChangeHandler={(index, value) => console.log(value)}
              multipleSelect={true}
            />
            <AppPicker
              placeholder={"Select City"}
              options={city}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, City: value })
              }
            />
            <AppPicker
              placeholder={"Select Company"}
              options={company}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, Make: value })
              }
            />
            <AppPicker
              placeholder={"Select Model"}
              options={items}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, Model: value })
              }
            />
            <AppPicker
              placeholder={"Select Year"}
              options={year}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, Year: value })
              }
            />
            <AppPicker
              placeholder={"Select Version"}
              options={items}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, Version: value })
              }
            />
            <AppPicker
              placeholder={"Select Registration City"}
              options={city}
              onChangeHandler={(index, value) =>
                setDropDownValues({
                  ...dropdownValues,
                  registrationCity: value,
                })
              }
            />
            <AppPicker
              placeholder={"Select Interior Color"}
              options={color}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, InteriorColor: value })
              }
            />
            <AppPicker
              placeholder={"Select Exterior Colour"}
              options={color}
              onChangeHandler={(index, value) =>
                setDropDownValues({ ...dropdownValues, ExteriorColor: value })
              }
            />*/}
          </View>
          <Button
            style={styles.background}
            title="Submit"
            onPressHandler={() => toggleModal(dropdownValues)}
          />
        </ScrollView>
      </Modal>
    </View>
  );
};
export default Filter;
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
});
