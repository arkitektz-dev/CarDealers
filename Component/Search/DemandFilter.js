import React, { useCallback, useEffect, useState } from "react";
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
import { Button } from "../Button/Index";
import { screenWidth } from "../../Global/Dimension";
import CategoryPickerItem from "../Picker/CategoryPickerItem";
import SliderData from "../SliderData/Index";
import changeNumberFormat from "../Converter";
import { AddCompanyMake } from "../../Data/FetchData";
const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const DemandFilter = ({
  modalVisible,
  toggleModal,
  onRequestClose,
  Visibility,
  onClear,
}) => {
  const [dropdownValues, setDropDownValues] = useState({
    Model: "",
    Make: "",
    Year: "",
    price: { init: "0", final: "10000000" },
  });
  const [rangPriceData, setRangePriceData] = useState();
  const clearFilter = () => {
    onClear();

    setDropDownValues({
      Model: "",
      Make: "",
      Year: "",
      price: { init: "0", final: "10000000" },
    });
  };
  const data = 0;
  // const getCompanies = () => {
  //   AddCompanyMake().then((res) => {
  //     const arr = [];
  //     res.docs.forEach((item) =>
  //       arr.push({
  //         label: item.data().name,
  //         value: item.data().name,
  //       })
  //     );
  //     setCompany(arr);
  //   });
  // };
  const handleValueChange = (e) => {
    setDropDownValues({
      ...dropdownValues,
      price: { init: e[0], final: e[1] },
    });
  };

  const items = [
    { label: "800cc", value: 1 },
    { label: "1300cc", value: 2 },
    { label: "1600cc", value: 3 },
  ];
  const makeCompany = [
    { label: "Toyota", value: "Toyota", categoryId: 1 },
    { label: "Honda", value: "Honda", categoryId: 2 },
  ];

  const Model = [
    { label: "Corolla", value: "Corolla", categoryId: 1, versionId: 1 },
    { label: "Prius", value: "Prius", categoryId: 1, versionId: 1 },
    { label: "Aqua", value: "Aqua", categoryId: 1, versionId: 1 },
    { label: "Civic", value: "Civic", categoryId: 2, versionId: 2 },
    { label: "Reborn ", value: "Reborn", categoryId: 2, versionId: 3 },
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

  return (
    <View>
      <Modal
        onRequestClose={onRequestClose}
        visible={modalVisible}
        animationType={"slide"}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={Visibility}
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ color: "#000000", fontSize: 18, fontWeight: "900" }}>
              Close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearFilter}
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ color: "#000000", fontSize: 18, fontWeight: "900" }}>
              Clear Filter
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <AppPicker
            title="Company"
            items={makeCompany}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, Make: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Company"
            selectedItem={dropdownValues.Make}
            width="100%"
          />
          <AppPicker
            title="Model"
            items={Model}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, Model: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Model"
            selectedItem={dropdownValues.Model}
            width="100%"
          />

          {/* <AppPicker
            title="Year"
            items={year}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, Year: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Year"
            selectedItem={dropdownValues.Year}
            width="100%"
          /> */}

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
          <Text style={{ fontWeight: "700", color: "#000000" }}>
            Price Range
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SliderData
              enabledTwo={dropdownValues.price.init != "0" ? false : true}
              enabledOne={
                dropdownValues.price.final != "10000000" ? false : true
              }
              onValueChanged={handleValueChange}
              values={[dropdownValues.price.init, dropdownValues.price.final]}
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
export default DemandFilter;
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
    height: "8%",
    alignItems: "center",
  },
  priceHolder: {
    borderRadius: 20,
    backgroundColor: "#d3d3d3",
    width: "35%",
    height: "70%",
    padding: 10,
  },
  txt: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});
