import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Modal, Text, View, Dimensions } from "react-native";
import AppPicker from "../Picker/Index";
import { Button } from "../../Component/Button/Index";
import { StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const Filter = ({ modalVisible, props }) => {
  const items = ["1000 Km", "2000 Km", "3000 Km"];
  const [dropdownValues, setDropDownValues] = useState({
    Assemble: "",
    EngineCapacity: "",
    Engine: "",
    Features: "",
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
  console.log(props);

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
              options={items} //onChange={}
            />
          </View>
          <Button
            style={styles.background}
            title="Submit"
            // onPressHandler={onPressHandler}
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
