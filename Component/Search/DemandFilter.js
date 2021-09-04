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
}) => {
  useEffect(() => {
    getCompanies();
  }, []);
  const [makeCompany, setCompany] = useState([]);
  const [dropdownValues, setDropDownValues] = useState({
    Model: "",
    Make: "",
    Year: "",
    price: { init: "", final: "" },
  });
  const [rangPriceData, setRangePriceData] = useState();
  const clearFilter = () => {
    setDropDownValues({
      Model: "",
      Make: "",
      Year: "",
      price: { init: "", final: "" },
    });
  };
  const data = 0;
  const getCompanies = () => {
    AddCompanyMake().then((res) => {
      const arr = [];
      res.docs.forEach((item) =>
        arr.push({
          label: item.data().name,
          value: item.data().name,
        })
      );
      setCompany(arr);
    });
  };
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
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
          }}
        >
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
            width="80%"
          />
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
            width="80%"
          />
          <AppPicker
            title="Year"
            items={year}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, Year: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Year"
            selectedItem={dropdownValues.Year}
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
          <Text style={{ fontWeight: "700", color: "#000000" }}>
            Price Range
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SliderData
              enabledTwo={true}
              onValueChanged={handleValueChange}
              values={[0, 5000000]}
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
    width: "30%",
    height: "70%",
    padding: 10,
  },
  txt: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});