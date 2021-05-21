import React, { memo, useState } from "react";
import { Text, Modal, View, StyleSheet } from "react-native";
import AppPicker from "../../Component/Picker/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { screenWidth } from "../../Global/Dimension";
import defaultStyles from "../../config/styles";
import AppCheckBox from "../../Component/AppCheckbox";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
  const [checkbox, setCheckbox] = useState([]);
  const [visible, setVisible] = useState(false);
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
  const checkboxData = ["AC", "Radio", "Gli", "xli"];

  const onPressHandler = () => {
    console.log(dropdownValues, checkbox);
    firestore()
      .collection("Car")
      .add(dropdownValues && checkbox)
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
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 49,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textAlignVertical: "center",
            }}
          >
            Add your Car
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View style={{ maxWidth: "70%" }}>
            <AppPicker
              items={items}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({ ...dropdownValues, Assemble: item.label })
              }
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Select Assemble"
              selectedItem={dropdownValues.Assemble}
              width="80%"
            />

            <TouchableOpacity
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderRadius: 25,
                flexDirection: "row",
                padding: 15,
                marginVertical: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <Text style={{ color: "#333", fontSize: 17 }}>
                Select Features
              </Text>
            </TouchableOpacity>
            <Modal visible={visible}>
              <Button
                title="Close"
                style={styles.buttonContainer}
                onPressHandler={() => setVisible(false)}
              />
              {checkboxData.map((item) => {
                return (
                  <View style={{ flexDirection: "row" }}>
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
              })}
            </Modal>
            <AppPicker
              items={type}
              name="category"
              onSelectItem={(item) =>
                setDropDownValues({
                  ...dropdownValues,
                  EngineCapacity: item.label,
                })
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
                setDropDownValues({ ...dropdownValues, City: item.label })
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
                setDropDownValues({ ...dropdownValues, Make: item.label })
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
                setDropDownValues({ ...dropdownValues, Model: item.label })
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
                setDropDownValues({ ...dropdownValues, Version: item.label })
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
                setDropDownValues({ ...dropdownValues, Year: item.label })
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
                setDropDownValues({ ...dropdownValues, City: item.label })
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
                setDropDownValues({
                  ...dropdownValues,
                  InteriorColor: item.label,
                })
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
                setDropDownValues({
                  ...dropdownValues,
                  ExteriorColor: item.label,
                })
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
  distance: {
    width: screenWidth * 0.09,
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
  buttonContainer: {
    marginTop: 10,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "red",
    alignSelf: "center",
  },
});
