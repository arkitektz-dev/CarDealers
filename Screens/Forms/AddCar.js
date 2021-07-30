import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import firestore from "@react-native-firebase/firestore";
import {
  Text,
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../Component/Authcontext";
import AppPicker from "../../Component/Pickers/Index";
import { Button } from "../../Component/Button/Index";
import AppTextInput from "../../Component/TextInput/Index";
import { screenWidth } from "../../Global/Dimension";
import defaultStyles from "../../config/styles";
import AppCheckBox from "../../Component/AppCheckbox";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import { BottomSheet } from "react-native-elements";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import {
  AddCarData,
  fetchShowroomCar,
  fetchDealerCar,
  getData,
} from "../../Data/FetchData";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import SliderData from "../../Component/SliderData/Index";
import storage from "@react-native-firebase/storage";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import changeNumberFormat from "../../Component/Converter";
import { ActivityIndicator } from "react-native";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
  const [amount, setAmount] = useState("");

  const [loader, setLoader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState([]);
  const [tempImage, setTempImage] = useState([]);
  const [assembly, setAssembly] = useState("");
  const [enginecapacity, setEngineCapacity] = useState("");
  const [engineType, setEngineType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [City, setCity] = useState("");
  const [ExteriorColor, setExteriorColor] = useState("");
  const [showroomPicker, setShowroomPicker] = useState("");
  const [dealerState, setDealerState] = useState("");
  const [showroomId, setShowroomId] = useState("");
  const [priceRange, setPriceRange] = useState({ init: "", final: "" });
  const [mileage, setRangeMileageData] = useState({ init: "", final: "" });

  const [information, setInformation] = useState({
    make: "",
    model: "",
    modelYear: "",
    version: "",
  });
  const showroomData = [];
  const dealerData = [];

  const [registrationCity, setRegistrationCity] = useState("");
  const [Description, setDescription] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [showroomStateData, setShowroomStateData] = useState("");
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    getData().then((res) => authContext.setUser(res.DealerId));
    fetchShowroomCar(authContext).then((res) => {
      res.data().showrooms.forEach((data) => {
        showroomData.push({
          value: data.id,
          label: data.name,
        });
      }),
        setShowroomStateData(showroomData);
    });

    fetchDealerCar().then(
      (data) =>
        data.forEach((querySnapshot) => {
          dealerData.push({
            value: querySnapshot.id,
            label: querySnapshot.data().name,
          });
        }),
      setDealerState(dealerData)
    );
  }, []);
  const bottomSheetHandeler = () => {
    if (isVisible == true) {
      setIsVisible(false);
    } else setIsVisible(true);
  };

  const handleValueChange = useCallback((low, high) => {
    setPriceRange({ init: low });
  }, []);
  const handleMileageChange = useCallback((low, high) => {
    setRangeMileageData({ init: low });
  }, []);

  const items = [
    { label: "800cc", value: "800cc" },
    { label: "1300cc", value: "1300cc" },
    { label: "1600cc", value: "1600cc" },
  ];

  const assembleType = [
    { label: "local", value: "local" },
    { label: "imported", value: "imported" },
  ];
  const color = [
    { label: "red", value: "red" },
    { label: "blue", value: "blue" },
    { label: "yellow", value: "yellow" },
  ];
  const city = [
    { label: "Karachi", value: "Karachi" },
    { label: "Lahore", value: "Lahore" },
    { label: "Islamabad", value: "Islamabad" },
  ];
  const type = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
  ];
  const modelCar = [
    { label: "Corolla", value: "Corolla" },
    { label: "Civic", value: "Civic" },
    { label: "Reborn ", value: "Reborn" },
  ];
  const versionCar = [
    { label: "Gli", value: "Gli" },
    { label: "Vti", value: "Vti" },
    { label: "xli ", value: "xli" },
  ];
  const year = [
    { label: "2000", value: "2000" },
    { label: "2002", value: "2002" },
    { label: "2009 ", value: "2009" },
  ];
  const company = [
    { label: "Suzuki", value: "Suzuki" },
    { label: "Toyota", value: "Toyota" },
    { label: "Honda", value: "Honda" },
  ];
  const engineTypeData = [
    { label: "Petrol", value: "Petrol" },
    { label: "Diesel", value: "Diesel" },
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
    const arr = [];
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
        const uri = response.uri;
        setTempImage([...tempImage, uri]);
      }
    });
  };
  const setUploadImageFromCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (response) => {
      if (response.errorMessage) {
        console.log("Facing Errors");
      } else {
        const uri = response.uri;
        setTempImage([...tempImage, uri]);
      }
    });
  };
  const imageURI = async () => {
    tempImage.map(async (pic, index) => {
      const uploadImage = pic.substring(pic.lastIndexOf("/") + 1);
      setUploading(true);
      setTransferred(0);
      const storageRef = storage().ref(`photos/${uploadImage}`);
      const task = storageRef.putFile(pic);

      task.on("state_changed", (taskSnapshot) => {
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100
        );
      });
      try {
        task;
        const url = storageRef.getDownloadURL();

        setImage([...image, url]);
        setUploading(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const checkboxData = ["AC", "Radio", "Sunroof"];

  const onPressHandler = async () => {
    setLoader(true);
    const showroomRef = firestore()
      .collection("Showrooms")
      .doc(showroomId);
    const userRef = firestore()
      .collection("Dealers")
      .doc(authContext.user);
    const dealerObj = {
      id: userRef,
    };
    const showroomObj = {
      id: showroomRef,
      name: showroomPicker,
    };

    imageURI();
    const obj = {
      amount: `${priceRange.init}`,
      dealer: dealerObj,
      featured: featured,
      images: image,
      showroom: showroomObj,
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
        mileage: `${mileage.init} KM`,
        registrationCity: registrationCity,
      },
    };
    await AddCarData(obj);

    setLoader(false);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.searchHolder}>
        <IonIcon
          style={{ margin: 10 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          onPress={() => navigation.goBack()}
        />
      </View>

      <BottomSheet
        isVisible={isVisible}
        containerStyle={{
          backgroundColor: "white",
          marginTop: "90%",
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          flexDirection: "column",
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            flex: 1,
            alignSelf: "flex-end",
            margin: 20,
          }}
          onPress={bottomSheetHandeler}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "grey",
            fontSize: 25,
            textAlign: "center",
            margin: 20,
          }}
        >
          Select the following
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <FontAwsome
            name="camera"
            color="grey"
            size={50}
            onPress={setUploadImageFromCamera}
          />
          <FontAwsome5
            name="images"
            color="grey"
            size={50}
            onPress={setUploadImage}
          />
        </View>
      </BottomSheet>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 0.7,
              borderBottomWidth: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderStyle: "dotted",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "blue",
                width: screenWidth * 0.93,
                height: 100,
                marginBottom: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={bottomSheetHandeler}>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  color="#333"
                  size={28}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#1e2d64",
                  }}
                >
                  Add Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              flex: 1,
              padding: 10,
              width: "100%",
              alignItems: "center",
            }}
          >
            <AppPicker
              items={assembleType}
              name="category"
              onSelectItem={(item) => setAssembly(item.label)}
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
              onSelectItem={(item) => setEngineCapacity(item.label)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Engine Capacity"
              selectedItem={enginecapacity}
              width="80%"
            />
            <AppPicker
              items={engineTypeData}
              name="category"
              onSelectItem={(item) => setEngineType(item.label)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Engine Type"
              selectedItem={engineType}
              width="80%"
            />
            <AppPicker
              items={type}
              name="category"
              onSelectItem={(item) => setTransmission(item.label)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Transmission"
              selectedItem={transmission}
              width="80%"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <Image source={Location} style={styles.img} /> */}
              <AppPicker
                items={city}
                name="category"
                onSelectItem={(item) => setCity(item.label)}
                PickerItemComponent={CategoryPickerItem}
                placeholder=" City"
                selectedItem={City}
                width="80%"
              />
            </View>
            <AppPicker
              items={company}
              name="category"
              onSelectItem={(item) =>
                setInformation({ ...information, make: item.label })
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
                setInformation({ ...information, model: item.label })
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
                setInformation({ ...information, modelYear: item.label })
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
                setInformation({ ...information, version: item.label })
              }
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Version"
              selectedItem={information.version}
              width="80%"
            />

            <AppPicker
              items={color}
              name="category"
              onSelectItem={(item) => setExteriorColor(item.label)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Exterior Color"
              selectedItem={ExteriorColor}
              width="80%"
            />

            <AppPicker
              items={city}
              name="category"
              onSelectItem={(item) => setRegistrationCity(item.label)}
              PickerItemComponent={CategoryPickerItem}
              placeholder=" Registration City"
              selectedItem={registrationCity}
              width="80%"
            />
            <AppPicker
              items={showroomStateData}
              name="category"
              onSelectItem={(item) => {
                setShowroomPicker(item.label), setShowroomId(item.value);
              }}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Showrooms"
              selectedItem={showroomPicker}
              width="80%"
            />
            <View
              style={{
                width: "85%",
                alignItems: "center",
                marginBottom: 10,
                bottom: 5,
              }}
            >
              <AppTextInput
                label={"Description"}
                onChangeHandler={(e) => setDescription(e)}
              />
            </View>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Selected Amount: Rs {changeNumberFormat(priceRange.init)}
                </Text>
                <SliderData onValueChanged={handleValueChange} />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Select Mileage: {mileage.init}KM
                </Text>
                <SliderData onValueChanged={handleMileageChange} />
              </View>

              <Button
                style={styles.background}
                title={
                  loader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    "Submit"
                  )
                }
                onPressHandler={onPressHandler}
              />
            </View>
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
    backgroundColor: "#1e2d64",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
  },
  distance: {
    width: screenWidth * 0.09,
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    flexGrow: 1,
    marginBottom: 10,
  },
  img: { width: 80, height: 45, resizeMode: "contain" },
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
