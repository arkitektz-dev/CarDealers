import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Modal, Text, View, Dimensions } from "react-native";
import AppPicker from "../Picker/Index";
import { Button } from "../../Component/Button/Index";
import { StyleSheet } from "react-native";
import { screenWidth } from "../../Global/Dimension";

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
  const items = ["1000 Km", "2000 Km", "3000 Km"];
  const color = ["red", "blue", "yellow"];
  const city = ["Karachi", "Lahore", "Islamabad"];
  const type = ["Automatic", "Manual"];
  const year = ["2000", "2002", "2009 Km"];
  const company = ["Suzuki", "Toyota", "Honda"];
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
            <AppPicker
              placeholder={"Select Assembly"}
              options={items}
              onChange={(index, value) =>
                setDropDownValues({ ...dropdownValues, Assemble: value })
              }
            />
            <AppPicker
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
            />
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
