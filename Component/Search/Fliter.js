import React, { useCallback, useState } from "react";
import {
  Modal,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import AppPicker from "../Pickers/Index";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import CategoryPickerItem from "../Picker/CategoryPickerItem";
import SliderData from "../SliderData/Index";
import changeNumberFormat from "../Converter";
const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const Filter = ({ modalVisible, toggleModal, toggleModalView, Visibility }) => {
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
    price: { init: "", final: "" },
  });
  const [rangPriceData, setRangePriceData] = useState();
  const clearFilter = () => {
    setDropDownValues({
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
  };
  const data = 0;
  const handleValueChange = useCallback((low, high) => {
    setDropDownValues({ ...dropdownValues, price: { init: low, final: high } });
  }, []);

  const items = [
    { label: "800cc", value: 1 },
    { label: "1300cc", value: 2 },
    { label: "1600cc", value: 3 },
  ];
  const Model = [
    { label: "City", value: 1 },
    { label: "Corolla", value: 2 },
  ];
  const color = [
    { label: "Red", value: 1 },
    { label: "Gold", value: 2 },
    { label: "Black", value: 3 },
  ];
  const city = [
    { label: "Karachi", value: 1 },
    { label: "Lahore", value: 2 },
    { label: "Islamabad", value: 3 },
  ];
  const type = [
    { label: "Local", value: 1 },
    { label: "Imported", value: 2 },
  ];
  const year = [
    { label: "2015", value: 1 },
    { label: "2010", value: 2 },
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
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={clearFilter}
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ color: "blue", fontSize: 18, fontWeight: "900" }}>
              Clear Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Visibility}
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ color: "blue", fontSize: 18, fontWeight: "900" }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
            }}
          >
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
            <View style={styles.priceNum}>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>
                  {changeNumberFormat(dropdownValues.price.init)}
                </Text>
              </View>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>
                  {changeNumberFormat(dropdownValues.price.final)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SliderData onValueChanged={handleValueChange} />
            </View>
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
    backgroundColor: "#1c2e65",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
  },
  priceNum: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "10%",
    alignItems: "center",
  },
  priceHolder: {
    borderRadius: 20,
    backgroundColor: "#d3d3d3",
    width: "30%",
    height: "80%",
    padding: 10,
  },
  txt: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});
