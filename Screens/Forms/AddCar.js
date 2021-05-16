import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppPicker from "../../Component/Picker/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { ScrollView } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = () => {
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

  const items = ["1000 Km", "2000 Km", "3000 Km"];
  const onPressHandler = () =>
    firestore()
      .collection("Advertisements")
      .add(dropdownValues)
      .then(() => {
        console.log("User added!");
      });
  return (
    <View
      style={{
        padding: 30,
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppPicker
          placeholder={"Select Assembly"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ Assemble: value })
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
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Engine: value })
          }
        />
        <AppPicker
          placeholder={"Select Features"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, Features: value })
          }
        />
        <AppPicker
          placeholder={"Select City"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, City: value })
          }
        />
        <AppPicker
          placeholder={"Select Company"}
          options={items}
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
          options={items}
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
          placeholder={"Select Version"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, registrationCity: value })
          }
        />
        <AppPicker
          placeholder={"Select Version"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, InteriorColor: value })
          }
        />
        <AppPicker
          placeholder={"Select Version"}
          options={items}
          onChangeHandler={(index, value) =>
            setDropDownValues({ ...dropdownValues, ExteriorColor: value })
          }
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
