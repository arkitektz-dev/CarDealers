import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppPicker from "../../Component/Picker/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { ScrollView } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { screenWidth } from "../../Global/Dimension";
import { TouchableOpacity } from "react-native";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
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
  var index = 0;
  const items = [
    { key: index++, label: "1000 Km" },
    { key: index++, label: "2000 Km" },
    { key: index++, label: "3000 Km" },
  ];
  // const color = ["red", "blue", "yellow"];
  // const city = ["Karachi", "Lahore", "Islamabad"];
  // const type = ["Automatic", "Manual"];
  // const year = ["2000", "2002", "2009 Km"];
  // const company = ["Suzuki", "Toyota", "Honda"];

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          left: 10,
          top: 10,
          backgroundColor: "red",
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
        }}
      ></TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppPicker
          // placeholder={"Select Assemble"}

          options={items}
          onChangeHandler={
            (option) => console.log(option.label)

            // setDropDownValues({ ...dropdownValues, Assemble: value })
          }
        />
        {/* <AppPicker
          //  placeholder={"Select Engine Capacity"}
          
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, EngineCapacity: value })
          }
        />
        <AppPicker
          // placeholder={"Select Engine Type"}
          
          options={type}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Engine: value })
          }
        />
        <AppPicker
          //  placeholder={"Select Features"}
          
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Features: value })
          }
        />
        <AppPicker
          //  placeholder={"Select City"}
          
          options={city}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, City: value })
          }
        />
        <AppPicker
          //  placeholder={"Select Company"}
          
          options={company}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Make: value })
          }
        />
        <AppPicker
          //  placeholder={"Select Model"}
          
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Model: value })
          }
        />
        <AppPicker
          // placeholder={"Select Year"}
          
          options={year}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Year: value })
          }
        />
        <AppPicker
          // placeholder={"Select Version"}
          
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Version: value })
          }
        />
        <AppPicker
          // placeholder={"Select RegistrationCity"}
          
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, registrationCity: value })
          }
        />
        <AppPicker
          // placeholder={"Select InteriorColor"}
          
          options={color}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, InteriorColor: value })
          }
        />
        <AppPicker
          // placeholder={"Select ExteriorColor"}
          
          options={color}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, ExteriorColor: value })
          }
        /> */}
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View style={{ maxWidth: "70%" }}>
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
export default AddCar;
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
