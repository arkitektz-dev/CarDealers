import React, { memo, useState } from "react";
import { Text, Modal, View, StyleSheet } from "react-native";
import AppPicker from "../../Component/Pickers/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { screenWidth } from "../../Global/Dimension";
import defaultStyles from "../../config/styles";
import AppCheckBox from "../../Component/AppCheckbox";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import { AddCarData } from "../../Data/FetchData";
import storage from "@react-native-firebase/storage";

import { launchImageLibrary } from "react-native-image-picker";
import { Icon } from "react-native-vector-icons/Icon";
const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [dealer, setDealer] = useState({
    id: "Dealers/773Dfs4yCxLIjuABaKDo",
    name: "Ijaz Hussain",
  });
  const [showroom, setShowroom] = useState({
    id: "Showrooms/2Bj5G6bG6F4KH6rtbNtW",
    name: "HSKB Motors",
  });
  const [featured, setFeatured] = useState(false);
  const [image,setImage]=useState();
  const [assembly, setAssembly] = useState("");
  const [enginecapacity, setEngineCapacity] = useState("");
  const [engineType, setEngineType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [City, setCity] = useState("");
  const [ExteriorColor, setExteriorColor] = useState("");
  const [information, setInformation] = useState({
    make: "",
    model: "",
    modelYear: "",
    version: "",
  });
  const images=[]
  const [registrationCity, setRegistrationCity] = useState("");
  const [Description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [visible, setVisible] = useState(false);

  const items = [
    { label: "800cc", value: 1 },
    { label: "1300cc", value: 2 },
    { label: "1600cc", value: 3 },
  ];

  const assembleType = [
    { label: "local", value: 1 },
    { label: "imported", value: 2 },
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
  const modelCar = [
    { label: "Corolla", value: 1 },
    { label: "Civic", value: 2 },
    { label: "Reborn ", value: 3 },
  ];
  const versionCar = [
    { label: "Gli", value: 1 },
    { label: "Vti", value: 2 },
    { label: "xli ", value: 3 },
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
  const engineTypeData = [
    { label: "Petrol", value: 1 },
    { label: "Diesel", value: 2 },
  ];
  const onChangeHandler = (item) => {
    if (checkbox.includes(item)) {
      const a = checkbox.filter((c) => c !== item);
      setCheckbox(a);
    } else {
      setCheckbox([...checkbox, item]);
    }
  };
  const setUploadImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.error) {
        alert("Error");
      } else {
        setImage(response.uri);
      }
    });
  };
  // const imageURI = async () => {
  //   const uploadImage = image.substring(image.lastIndexOf("/") + 1);
  //   setUploading(true);
  //   setTransferred(0);
  //   const storageRef = storage().ref(`photos/${uploadImage}`);
  //   const task = storageRef.putFile(image);
  //   task.on("state_changed", (taskSnapshot) => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
  //     );
  //     setTransferred(
  //       Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
  //         100
  //     );
  //   });
  //   try {
  //     await task;
  //     const url = await storageRef.getDownloadURL();
  //     setUploading(false);
  //     setImage(null);
  //     alert("Picture Added");
  //     return url;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const url =  imageURI();
  //  images.push(url)
  const checkboxData = ["AC", "Radio", "Sunroof"];

  const onPressHandler = () => {
    const obj = {
      amount: amount,
      dealer: dealer,
      featured: featured,

      images:images,
      showroom: showroom,

      vehicle: {
        additionalInformation: {
          assembly: assembly,
          engineCapacity: enginecapacity,
          engineType: engineType,
          features: checkbox,
          transmission: transmission,
        },
        city: City,
        description: Description,
        exteriorColor: ExteriorColor,
        information: information,
        mileage: mileage,
        registrationCity: ExteriorColor,
      },
    };
    // AddCarData(obj);
    console.log(obj)
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
        <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor:'blue',
    width:screenWidth*0.8,
    height:100,
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  }}>
    <Text style={{fontSize:15,fontWeight:'bold'}}>Add Photo</Text>
</View>
            <AppPicker
              items={assembleType}
              name="category"
              onSelectItem={(item) => setAssembly(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Assembly"
              selectedItem={assembly}
              width="80%"
            />

            <TouchableOpacity
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderRadius: 25,
                flexDirection: "row",
                padding: 15,
                marginVertical: 10,
                width: 220,
              }}
              onPress={() => setVisible(true)}
            >
              <Text style={{ color: "#333", fontSize: 17 }}>
                Select Features
              </Text>
            </TouchableOpacity>
            <Modal visible={visible} animationType="slide">

 
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
              items={items}
              name="category"
              onSelectItem={(item) => setEngineCapacity(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Engine Capacity"
              selectedItem={enginecapacity}
              width="80%"
            />
            <AppPicker
              items={engineTypeData}
              name="category"
              onSelectItem={(item) => setEngineType(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Engine Type"
              selectedItem={engineType}
              width="80%"
            />
            <AppPicker
              items={type}
              name="category"
              onSelectItem={(item) => setTransmission(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Transmission"
              selectedItem={transmission}
              width="80%"
            />
            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) => setCity(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" City"
              selectedItem={City}
              width="80%"
            />

            <AppPicker
              items={company}
              name="category"
              onSelectItem={(item) =>
                setInformation({ ...information, make: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Company"
              selectedItem={information.make}
              width="80%"
            />
            <AppPicker
              items={modelCar}
              name="category"
              onSelectItem={(item) =>
                setInformation({ ...information, model: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Model"
              selectedItem={information.model}
              width="80%"
            />

            <AppPicker
              items={year}
              name="category"
              onSelectItem={(item) =>
                setInformation({ ...information, modelYear: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Model Year"
              selectedItem={information.modelYear}
              width="80%"
            />
            <AppPicker
              items={versionCar}
              name="category"
              onSelectItem={(item) =>
                setInformation({ ...information, version: item })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Version"
              selectedItem={information.version}
              width="80%"
            />

            <AppPicker
              items={color}
              name="category"
              onSelectItem={(item) => setExteriorColor(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Exterior Color"
              selectedItem={ExteriorColor}
              width="80%"
            />

            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) => setRegistrationCity(item)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Registration City"
              selectedItem={registrationCity}
              width="80%"
            />
            <AppTextInput
              label={"Description"}
              multiline={true}
              onChangeHandler={(e) => setDescription(e)}
            />
            <AppTextInput
              label={"Mileage"}
              keyboardType={"number-pad"}
              onChangeHandler={(e) => setMileage(e)}
            />
            <AppTextInput
              label={"Price"}
              keyboardType={"number-pad"}
              onChangeHandler={(e) => setAmount(e)}
            />

            <Button
              style={styles.background}
              title="Submit"
              onPressHandler={onPressHandler}
            />
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
