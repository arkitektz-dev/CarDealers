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
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import CategoryPickerItem from "../Picker/CategoryPickerItem";
import SliderData from "../SliderData/Index";
import changeNumberFormat from "../Converter";
import { AddCompanyMake } from "../../Data/FetchData";
import Checkbox from "../Checkbox";
import Transmission from "../../Assets/Transmission.png";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const Filter = ({
  modalVisible,
  toggleModal,
  onRequestClose,
  toggleModalView,
  Visibility,
  onClear,
}) => {
  useEffect(() => {
    getCompanies();
  }, []);
  const [makeCompany, setCompany] = useState([]);
  const [priceState, setPriceState] = useState(false);
  const [mileageState, setMileageState] = useState(false);
  const [dropdownValues, setDropDownValues] = useState({
    Assemble: "",
    EngineCapacity: "",
    Engine: "",
    Features: [],
    City: "",
    location: "",
    Model: "",
    Make: "",
    Year: "",
    Version: "",
    registrationCity: "",
    ExteriorColor: "",
    InteriorColor: "",
    Description: "",
    mileage: { init: "0", final: "1000000" },
    price: { init: "0", final: "10000000" },
    transmission: "",
  });
  const [assemblyCheckedState, setAssemblyCheckedState] = useState({
    first: false,
    second: false,
  });
  const clearFilter = () => {
    onClear();
    setMileageState(false);
    setPriceState(false);
    setAssemblyCheckedState({
      first: false,
      second: false,
    });
    setDropDownValues({
      Assemble: "",
      EngineCapacity: "",
      Engine: "",
      Features: [],
      City: "",
      location: "",
      Model: "",
      Make: "",
      Year: "",
      Version: "",
      registrationCity: "",
      ExteriorColor: "",
      InteriorColor: "",
      Description: "",
      mileage: { init: "0", final: "1000000" },
      price: { init: "0", final: "10000000" },
      transmission: "",
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
    if (!priceState) {
      setPriceState(true);
    }
    setDropDownValues({
      ...dropdownValues,
      price: {
        init: e[0] ? e[0] : dropdownValues.price.init,
        final: e[1] ? e[1] : dropdownValues.price.final,
      },
    });
  };
  const handleValueChangeMillage = (e) => {
    if (!mileageState) {
      setMileageState(true);
    }
    setDropDownValues({
      ...dropdownValues,
      mileage: {
        init: e[0] ? e[0] : dropdownValues.mileage.init,
        final: e[1] ? e[1] : dropdownValues.mileage.final,
      },
    });
  };
  const [locations, setLocations] = useState([]);

  const items = [
    { label: "800cc", value: 1 },
    { label: "1300cc", value: 2 },
    { label: "1600cc", value: 3 },
  ];
  const modelCar = [
    { label: "Corolla", value: "Corolla" },
    { label: "Civic", value: "Civic" },
    { label: "Reborn ", value: "Reborn" },
  ];
  const color = [
    { label: "Red", value: 1 },
    { label: "Black", value: 2 },
    { label: "Gold", value: 3 },
  ];
  const city = [
    { label: "Karachi", value: "Karachi", cityId: 1 },
    { label: "Lahore", value: "Lahore", cityId: 2 },
    { label: "Islamabad", value: "Islamabad", cityId: 3 },
  ];
  const areas = [
    { label: "Gulshan", value: "Gulshan", cityId: 1 },
    { label: "Defence", value: "Defence", cityId: 1 },
    { label: "Johar", value: "Johar", cityId: 1 },
    { label: "Green Area", value: "Green Area", cityId: 3 },
    { label: "Blue Area", value: "Blue Area", cityId: 3 },
    { label: "Gulberg", value: "Gulberg", cityId: 2 },
    { label: "Lalokhet", value: "Lalokhet", cityId: 1},
  ];
  const onChangeHandler2 = (item) => {
    const body = areas.filter((e) => e.cityId == item.cityId);
    setDropDownValues({ ...dropdownValues, City: item.label,location:'' })
    setLocations(body);
    console.log(body);
  };
  const type = [
    { label: "local", value: 1 },
    { label: "imported", value: 2 },
  ];
  const year = [
    { label: "2015", value: 1 },
    { label: "2010", value: 2 },
    { label: "2016", value: 3 },
  ];
  const transmission = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Modal
        onRequestClose={onRequestClose}
        visible={modalVisible}
        animationType={"slide"}
        presentationStyle="overFullScreen"
        transparent
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#1c2e65",
          }}
        >
          <TouchableOpacity
            onPress={Visibility}
            style={{
              margin: 5,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              color="white"
              size={31}
              onPress={() => Visibility()}
            />
            <Text
              style={{ color: "#fff", fontSize: 18, top: 5, fontWeight: "900" }}
            >
              Refine Search
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
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900" }}>
              Clear Filter
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center",

            backgroundColor: "white",
            height:1000,
          }}
        >
          <View
            style={{
              marginTop: "10%",
              borderBottomColor: "#d3d3d3",
              borderBottomWidth: 0.2,
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                left: "10%",
                bottom: 5,
                fontSize: 18,
                fontWeight: "600",
                color: "#6e6969",
              }}
            >
              Select Assemble Type:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 5,
              }}
            >
              <Checkbox
                key={type[1].value}
                onPress={() => {
                  setDropDownValues({
                    ...dropdownValues,
                    Assemble: type[0].label,
                  });

                  if (assemblyCheckedState.first == false) {
                    setAssemblyCheckedState({
                      assemblyCheckedState,
                      second: false,
                      first: true,
                    });
                  } else {
                    setAssemblyCheckedState({
                      assemblyCheckedState,
                      first: false,
                    });
                  }
                }}
                title={type[0].label}
                checkedState={assemblyCheckedState.first}
              />
              <Checkbox
                key={type[1].value}
                onPress={() => {
                  setDropDownValues({
                    ...dropdownValues,
                    Assemble: type[1].label,
                  });

                  if (assemblyCheckedState.second == false) {
                    setAssemblyCheckedState({
                      assemblyCheckedState,
                      first: false,
                      second: true,
                    });
                  } else {
                    setAssemblyCheckedState({
                      assemblyCheckedState,
                      second: false,
                    });
                  }
                }}
                title={type[1].label}
                checkedState={assemblyCheckedState.second}
              />
            </View>
          </View>
          <AppPicker
            title="Make"
            items={makeCompany}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, Make: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Make"
            selectedItem={dropdownValues.Make}
            width="95%"
          />
          <AppPicker
            title="Car Model"
            items={modelCar}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({
                ...dropdownValues,
                Model: item.label,
              })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Model"
            selectedItem={dropdownValues.Model}
            width="95%"
          />
          <AppPicker
            title="Engine Capacity"
            items={items}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({
                ...dropdownValues,
                EngineCapacity: item.label,
              })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Engine Capacity"
            selectedItem={dropdownValues.EngineCapacity}
            width="95%"
          />
          <AppPicker
            title="City"
            items={city}
            name="category"
            onSelectItem={(item) =>
              
              onChangeHandler2(item)
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select City"
            selectedItem={dropdownValues.City}
            width="95%"
          />
          <AppPicker
            title="Location"
            items={locations}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, location: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Location"
            selectedItem={dropdownValues.location}
            width="95%"
          />
          <AppPicker
            title="Registered City"
            items={city}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({
                ...dropdownValues,
                registrationCity: item.label,
              })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder=" Registration City"
            selectedItem={dropdownValues.registrationCity}
            width="95%"
          />
          <AppPicker
            title="Engine Transmission"
            items={transmission}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, transmission: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder=" Transmission"
            selectedItem={dropdownValues.transmission}
            width="95%"
          />
          {/* <AppPicker
            title="Color"
            items={color}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({
                ...dropdownValues,
                ExteriorColor: item.label,
              })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Color"
            selectedItem={dropdownValues.ExteriorColor}
            width="95%"
          /> */}
          {/* <AppPicker
            title="Location"
            items={city}
            name="category"
            onSelectItem={(item) =>
              setDropDownValues({ ...dropdownValues, City: item.label })
            }
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Location"
            selectedItem={dropdownValues.City}
            width="95%"
          /> */}
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
            width="95%"
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
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#000000" }}>
            Price Range: (PKR)
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SliderData
              enabledTwo={mileageState == true ? false : true}
              enabledOne={mileageState == true ? false : true}
              onValueChanged={handleValueChange}
              values={[dropdownValues.price.init, dropdownValues.price.final]}
              max={10000000}
              step={25000}
            />
          </View>
          <View style={styles.priceNum}>
            <View style={styles.priceHolder}>
              <Text style={styles.txt}>{dropdownValues.mileage.init} KM</Text>
            </View>
            <View style={styles.priceHolder}>
              <Text style={styles.txt}>{dropdownValues.mileage.final} KM</Text>
            </View>
          </View>
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#000000" }}>
            Mileage Range: (KM)
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SliderData
              enabledTwo={priceState == true ? false : true}
              enabledOne={priceState == true ? false : true}
              onValueChanged={handleValueChangeMillage}
              values={[
                dropdownValues.mileage.init,
                dropdownValues.mileage.final,
              ]}
              max={1000000}
              step={3000}
            />
          </View>
          {/* <View style={styles.priceNum}>
            <View style={styles.priceHolder}>
              <Text style={styles.txt}>{dropdownValues.mileage.init} KM</Text>
            </View>
            <View style={styles.priceHolder}>
              <Text style={styles.txt}>{dropdownValues.mileage.final} KM</Text>
            </View>
          </View>
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#000000" }}>
            Mileage Range: (KM)
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SliderData
              enabledTwo={priceState == true ? false : true}
              enabledOne={priceState == true ? false : true}
              onValueChanged={handleValueChangeMillage}
              values={[
                dropdownValues.mileage.init,
                dropdownValues.mileage.final,
              ]}
              max={1000000}
              step={3000}
            />
          </View> */}

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
  },
  priceNum: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "8%",
    alignItems: "center",
  },
  priceHolder: {
    borderRadius: 7,
    backgroundColor: "#d3d3d3",
    width: "40%",
    height: 40,
    padding: 10,
  },
  txt: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});
