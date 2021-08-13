import React, { memo, useContext, useEffect, useState } from "react";
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
// import AppFormImagePicker from "../../Component/ImageHandling/AppFormImage";
// import AppForm from "../../Component/ImageHandling/AppForm";
import ImageInputList from "../../Component/ImageHandling/ImageInputList";

import {
  AddCarData,
  fetchShowroomCar,
  fetchDealerCar,
  getData,
  AddCompanyMake,
} from "../../Data/FetchData";
import SliderData from "../../Component/SliderData/Index";
import storage from "@react-native-firebase/storage";
import IonIcon from "react-native-vector-icons/Ionicons";
import changeNumberFormat from "../../Component/Converter";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;
const AddCar = ({ navigation }) => {
  const [makeCompany, setCompany] = useState([]);

  const [loader, setLoader] = useState(false);

  const [imagesArr, setImagesArr] = useState([]);
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
  const [priceRange, setPriceRange] = useState({ init: "0" });
  const [mileage, setRangeMileageData] = useState({ init: "0" });

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
  const [imagesUrl, setImagesUrl] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [showroomStateData, setShowroomStateData] = useState("");
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getCompanies();
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
    setPriceRange({ init: e[0] });
  };
  const handleMileageChange = (e) => {
    setRangeMileageData({ init: e[0] });
  };

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

  const imageURI = async () => {
    var a = [];
    imagesArr.map((item) => {
      const uploadImage = item.substring(item.lastIndexOf("/") + 1);
      const storageRef = storage().ref(`photos/${uploadImage}`);
      storageRef
        .putFile(item)
        .then(async (snapshot) => {
          const url = await storageRef.getDownloadURL();
          // setImagesUrl(...imagesUrl, { images: url });
          a.push(url);
        })
        .catch((e) => console.log("uploading image error => ", e));
    });
    setImagesUrl(a);
    return imagesUrl;
  };

  const checkboxData = ["AC", "Radio", "Sunroof"];

  const onPressHandler = async () => {
    const images = [];
    await images.push(imageURI());

    setLoader(true);
    const showroomRef = firestore()
      .collection("Showrooms")
      .doc(showroomId.toString());
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

    const obj = {
      amount: `${priceRange.init}`,
      dealer: dealerObj,
      images: [
        "https://cache4.pakwheels.com/ad_pictures/5134/toyota-corolla-gli-vvti-automatic-2016-51344671.jpg",
      ],
      // images.length > 0
      //   ? images
      //   : image.push(
      //       "https://cache4.pakwheels.com/ad_pictures/5134/toyota-corolla-gli-vvti-automatic-2016-51344671.jpg"
      //     ),
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

  const handleAdd = (uri) => {
    setImagesArr([...imagesArr, uri]);
  };

  const handleRemove = (uri) => {
    setImagesArr(imagesArr.filter((imagesArr) => imagesArr !== uri));
  };

  return (
    <>
      <View style={styles.searchHolder}>
        <IonIcon
          style={{ margin: 10 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlignVertical: "center",
            marginLeft: "20%",
            color: "#fff",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Add Advertisment
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: "white",
          justifyContent: "center",
          borderStyle: "dotted",
          borderBottomWidth: 1,
          borderRadius: 1,
          borderBottomColor: "#1e2d64",
          padding: 10,
        }}
      >
        {/* <AppForm
          initialValues={{
            images: [],
          }}
          onSubmit={(e) => onPressHandler(e)}
        >
          <AppFormImagePicker name="images" />
        </AppForm> */}

        <ImageInputList
          imageUris={imagesArr}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      </View>

      <View
        style={{
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
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
                  width: 305,
                }}
                onPress={() => setVisible(true)}
              >
                <Text style={{ color: "#333", fontSize: 17 }}>
                  Select Features
                </Text>
              </TouchableOpacity>
              <Modal visible={visible} animationType="slide">
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                    borderBottomColor: "#000000",
                    borderBottomWidth: 0.5,
                  }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      margin: 10,
                      fontSize: 16,
                    }}
                  >
                    Select
                  </Text>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        margin: 10,
                      }}
                    >
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>

                {checkboxData.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                      }}
                    >
                      <AppCheckBox
                        status={
                          checkbox.includes(item) ? "checked" : "unchecked"
                        }
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
              {checkbox.length > 0 ? (
                <Text
                  style={{
                    color: "#1e2d64",
                    fontWeight: "600",
                    fontStyle: "normal",
                  }}
                >
                  {checkbox.length} Features Selected
                </Text>
              ) : null}
              <AppPicker
                title="Engine Capacity"
                items={items}
                name="category"
                onSelectItem={(item) => setEngineCapacity(item.label)}
                PickerItemComponent={CategoryPickerItem}
                placeholder=" Engine Capacity"
                selectedItem={enginecapacity}
                width="80%"
              />
              <AppPicker
                title="Engine Type"
                items={engineTypeData}
                name="category"
                onSelectItem={(item) => setEngineType(item.label)}
                PickerItemComponent={CategoryPickerItem}
                placeholder=" Engine Type"
                selectedItem={engineType}
                width="80%"
              />
              <AppPicker
                title="Engine Transmission"
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
                  title="City"
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
                title="Company"
                items={makeCompany}
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
                title="Car Model"
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
                title="Model Year"
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
                title="Car Version"
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
                title="Car Exterior Color"
                items={color}
                name="category"
                onSelectItem={(item) => setExteriorColor(item.label)}
                PickerItemComponent={CategoryPickerItem}
                placeholder=" Exterior Color"
                selectedItem={ExteriorColor}
                width="80%"
              />

              <AppPicker
                title="Registered City"
                items={city}
                name="category"
                onSelectItem={(item) => setRegistrationCity(item.label)}
                PickerItemComponent={CategoryPickerItem}
                placeholder=" Registration City"
                selectedItem={registrationCity}
                width="80%"
              />
              <AppPicker
                title="Showroom"
                items={showroomStateData}
                name="category"
                onSelectItem={(item) => {
                  setShowroomPicker(item.label), setShowroomId(item.value);
                }}
                PickerItemComponent={CategoryPickerItem}
                placeholder="Showrooms"
                selectedItem={showroomPicker}
                width="82%"
              />
              <View
                style={{
                  width: "92%",
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 15,
                    }}
                  >
                    <TextInput
                      placeholderTextColor={"#000000"}
                      placeholder="0 Rs"
                      value={changeNumberFormat(priceRange.init)}
                      style={styles.int}
                    />
                  </View>
                  <SliderData
                    values={[0]}
                    enabledTwo={false}
                    onValueChanged={handleValueChange}
                  />
                </View>

                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 15,
                    }}
                  >
                    <TextInput
                      placeholder="0 Km"
                      value={`${mileage.init} Km`}
                      style={styles.int}
                    />
                  </View>
                  <SliderData
                    values={[0]}
                    enabledTwo={false}
                    onValueChanged={handleMileageChange}
                  />
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
    </>
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
  int: {
    borderWidth: 1,
    borderColor: "#000000",
    width: screenWidth * 0.4,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    borderRadius: 5,
  },
  distance: {
    width: screenWidth * 0.09,
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    width: "100%",
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
