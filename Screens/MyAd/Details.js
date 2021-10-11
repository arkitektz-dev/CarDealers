import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "react-native-elements/dist/bottomSheet/BottomSheet";
import { FlatList } from "react-native-gesture-handler";
import ImageSlider from "react-native-image-slider";
import AppPicker from "../../Component/Pickers/Index";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import firestore from "@react-native-firebase/firestore";
import { useToast } from "native-base";

import AppCheckBox from "../../Component/AppCheckbox";

import { Button } from "../../Component/Button/Index";
import Calendar from "../../Assets/NewAsset/Calendar.png";
import Radio from "../../Assets/NewAsset/radio.png";
import Speedometer from "../../Assets/NewAsset/Speedometer.png";
import Petrol from "../../Assets/NewAsset/Petrol.png";
import Arrow from "../../Assets/NewAsset/Arrow.png";
import CallSeller from "../../Assets/NewAsset/CallSeller.png";
import {
  defineDate,
  defineValue,
  defineValuePrice,
  screenHeight,
} from "../../Global/Dimension";
import {
  fetchSpecificDealer,
  UpdateCarData,
  GetCarId,
} from "../../Data/FetchData";
import AuthContext from "../../Component/Authcontext";
const DetailCarScreen = ({ route, navigation }) => {
  const item = route.params.item;
  const [images, setImages] = useState(item.images);
  const [isVisible, setIsVisible] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [dealerData, setDealerData] = useState();
  const [checkbox, setCheckbox] = useState([]);
  const [id, setId] = useState("");
  const toast = useToast();

  const dealerId = item.dealer.id.id;
  const authContext = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const statuses = ["Active", "Inactive", "Sold"];
  useEffect(() => {
    // console.log(authContext.user, "Oka");
    fetchSpecificDealer(authContext.user).then((data) =>
      setDealerData(data.data())
    );
    GetCarId(item, handleId);
    setCheckbox([item.adStatus]);
  }, []);
  const onChangeHandler = (item) => {
    setCheckbox([item]);
  };
  const handleId = (id) => {
    setId(id);
  };
  const onEdit = () => {
    if (checkbox[0] == item.adStatus) {
      setModal(false);
    } else {
      setStatusLoader(true);
      UpdateCarData(item, checkbox[0], functionBack, id);
    }
  };
  const functionBack = (data) => {
    console.log("back called");
    item.adStatus = data.adStatus;
    setModal(false);
    setStateChange(true);
    toast.show({
      title: "Status Changed",
      status: "success",
      description: "Your Ad. status has been changed",
      duration: 1500,
      minWidth: "90%",
      isClosable: false,
    });
    setStatusLoader(false);
  };
  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${dealerData.contactInformation[0]}`;
    } else {
      phoneNumber = `telprompt:${dealerData.contactInformation[0]}`;
    }

    Linking.openURL(phoneNumber);
  };
  const bottomSheetHandeler = () => {
    if (isVisible == true) {
      setIsVisible(false);
    } else setIsVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          if (stateChange) {
            navigation.goBack();
            route.params.onBackHandler();
          } else {
            navigation.goBack();
          }
        }}
      >
        <IonIcon
          style={{ marginRight: 8 }}
          name="chevron-back-sharp"
          color="#fff"
          size={32}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.imageHolder}>
          <ImageSlider
            style={styles.carousel}
            loop={true}
            loopBothSides
            autoPlayWithInterval={3000}
            images={images}
          >
            <IonIcon
              name="chevron-back-circle-sharp"
              color="grey"
              size={35}
              onPress={() => navigation.goBack()}
            />
          </ImageSlider>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.vehicle.information.make} {item.vehicle.information.model}{" "}
            {item.vehicle.information.modelYear}
          </Text>
          <Text style={styles.price}>
            {`PKR ${defineValuePrice(item.amount)} `}{" "}
          </Text>
          {/* <Text style={styles.location}>{item.vehicle.city} </Text> */}
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.location, { fontWeight: "normal" }]}>
              {defineValue(item.vehicle.city)} | {defineValue(item.adStatus)}{" "}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#A7D2DE",
                borderRadius: 20,
                paddingHorizontal: 8,
              }}
              onPress={() => setModal(true)}
            >
              <Text style={[styles.location, { color: "black" }]}>
                Change Status{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modal} animationType="fade" transparent={true}>
          <View
            style={{
              flex: 1,

              backgroundColor: "rgba(0,0,0,0.7)",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View style={styles.dropdownHeader}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 16,
                }}
              >
                Change Status
              </Text>
              {statusLoader ? (
                <ActivityIndicator size="small" color="#1e2d64" />
              ) : (
                <TouchableOpacity onPress={() => onEdit()}>
                  <Text
                    style={{
                      color: "#1e2d64",
                      fontSize: 16,
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView style={styles.form_container}>
              {statuses.map((item) => {
                return (
                  <TouchableOpacity
                    style={styles.checkerItem}
                    activeOpacity={0.8}
                    onPress={() => onChangeHandler(item)}
                  >
                    <Text
                      style={{
                        color: checkbox.includes(item) ? "black" : "grey",
                        fontSize: 18,
                        fontWeight: "800",
                        marginTop: 5,
                      }}
                      key={(item, index) => index.toString()}
                    >
                      {item}
                    </Text>
                    {checkbox.includes(item) ? (
                      <AppCheckBox
                        status={
                          checkbox.includes(item) ? "checked" : "unchecked"
                        }
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Modal>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.CarInfoTitle}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={Calendar} style={styles.img} />
              <Text style={{ color: "#000000", fontFamily: "Roboto-Bold" }}>
                {defineValue(item.vehicle.information.modelYear)}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // flex: 1,
              }}
            >
              <Image source={Speedometer} style={styles.img} />
              <Text style={{ color: "#000000", fontFamily: "Roboto-Bold" }}>
                {defineValue(item.vehicle.mileage)}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // flex: 1,
              }}
            >
              <Image source={Petrol} style={styles.img} />
              <Text style={{ color: "#000000", fontFamily: "Roboto-Bold" }}>
                {defineValue(item.vehicle.additionalInformation.engineType)}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // flex: 1,
              }}
            >
              <Image source={Arrow} style={styles.img} />
              <Text style={{ color: "#000000", fontFamily: "Roboto-Bold" }}>
                {defineValue(item.vehicle.additionalInformation.transmission)}
              </Text>
            </View>
          </View>
          <View style={styles.detailView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={styles.subDataRow}>
                <View style={styles.propertyBorder}>
                  <Text style={styles.text}>Registration City</Text>
                  <Text style={styles.text2}>
                    {defineValue(item.vehicle.registrationCity)}
                  </Text>
                </View>
                <View style={styles.otherData}>
                  <Text style={styles.text}>Exterior Color</Text>
                  <Text style={styles.text2}>
                    {defineValue(item.vehicle.exteriorColor)}
                  </Text>
                </View>
                <View style={styles.otherData}>
                  <Text style={styles.text}>Assembly </Text>
                  <Text style={styles.text2}>
                    {defineValue(item.vehicle.additionalInformation.assembly)}
                  </Text>
                </View>
                <View style={styles.otherData}>
                  <Text style={styles.text}>Engine Capacity</Text>
                  <Text style={styles.text2}>
                    {defineValue(
                      item.vehicle.additionalInformation.engineCapacity
                    )}
                  </Text>
                </View>
                <View style={styles.lastData}>
                  <Text style={styles.text}>Last Updated</Text>
                  <Text style={styles.text2}>{defineDate(item.date)}</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                marginTop: 5,
                fontSize: 21,
                fontFamily: "Roboto-Bold",
                color: "#373737",
              }}
            >
              Features
            </Text>
            <FlatList
              numColumns={2}
              data={item.vehicle.additionalInformation.features}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "48%",
                      marginTop: 20,
                      // paddingHorizontal:2
                    }}
                  >
                    {/* <Image source={Radio} style={styles.img} /> */}
                    <View style={{ width: "16%" }}>
                      <MaterialIcons
                        style={{ marginRight: 4, marginTop: -2 }}
                        name="radio"
                        color="#AEB1B5"
                        size={24}
                      />
                    </View>
                    <View style={{ width: "82%" }}>
                      <Text style={styles.feature}>{item}</Text>
                    </View>
                  </View>
                );
              }}
            />
            <View style={{ height: screenHeight * 0.04 }}></View>
            {/* <Text
              style={{
                marginLeft: 20,
                fontSize: 21,
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              Seller Detail
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                borderColor: "#e0e0e0",
                borderStyle: "dotted",
                borderBottomWidth: 1,
              }}
            >
              <Text style={styles.dealerName}>
                {dealerData && dealerData.name}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0}
              onPress={bottomSheetHandeler}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                height: 70,
              }}
            >
              <Image
                source={CallSeller}
                style={{
                  width: 150,
                  height: 50,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        {/* <BottomSheet
          isVisible={isVisible}
          containerStyle={{
            backgroundColor: "white",
            marginTop: "90%",
            borderWidth: 0.3,
            borderColor: "black",

            flexDirection: "column",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderBottomColor: "black",
              borderBottomWidth: 1,
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 19,
                fontWeight: "bold",
                margin: 13,
              }}
            >
              Seller's Number
            </Text>

            <Text
              onPress={bottomSheetHandeler}
              style={{
                color: "black",
                fontSize: 19,
                fontWeight: "bold",
                margin: 13,
              }}
            >
              Cancel
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={styles.callText}>
              {dealerData && dealerData.contactInformation[0]}
            </Text>
            <Text style={styles.callText}>
              Mention CarDealer.com when calling seller to get a good deal.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              title="Call Now"
              style={styles.button}
              onPressHandler={makeCall}
            />
          </View>
        </BottomSheet> */}
      </ScrollView>
    </>
  );
};
export default DetailCarScreen;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e2d64",
    height: 40,
    width: "60%",
    borderRadius: 15,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 10,
  },
  dealerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 20,
    textTransform: "capitalize",
  },
  dealerEmail: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dealerEmailText: {
    fontSize: 15,
    color: "grey",
    textAlign: "center",
    marginRight: -5,
    marginLeft: 5,
  },
  subData: {
    margin: 10,
    flexDirection: "row",
  },
  line: {
    flexDirection: "column",
    backgroundColor: "red",
    height: screenHeight * 0.06,
  },
  h1: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt1: {
    color: "grey",
    fontSize: 15,
    fontWeight: "800",
  },
  subDataRow: {
    marginTop: 5,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  img: {
    width: 26,
    height: 20,
    margin: 10,
    resizeMode: "contain",
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 21,
    color: "white",
    textAlignVertical: "center",
    marginBottom: 5,
  },
  CarInfoTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  detailView: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: "#373737",
    fontSize: 22,
    fontFamily: "Roboto-Medium",
  },
  location: {
    color: "#ADB0B4",
    fontSize: 17,
    fontFamily: "Roboto-Medium",
  },
  price: {
    color: "#373737",
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
  imageSize: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#A9A9A9",

    fontSize: 16,
    textAlignVertical: "center",
    fontFamily: "Roboto-Medium",
  },
  feature: {
    color: "#373737",
    fontSize: 15,
    textAlignVertical: "center",
    fontFamily: "Roboto-Regular",
    // width:'90%'
  },
  propertyBorder: {
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    justifyContent: "space-between",
    marginTop: 10,
    textAlign: "right",
    borderStyle: "dotted",
    paddingVertical: 5,
  },
  otherData: {
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    borderStyle: "dotted",
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  lastData: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  text2: {
    color: "#373737",
    fontSize: 16,
    margin: 10,
    fontFamily: "Roboto-Medium",
    textTransform: "capitalize",
  },
  callText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
    margin: 15,
    textAlign: "center",
  },
  imageHolder: {
    alignSelf: "center",
    height: 200,
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    marginHorizontal: 20,
    borderBottomWidth: 0.4,
    opacity: 2,
    shadowColor: "#ADB0B4",
    shadowOpacity: 2,
    paddingTop: 8,
    paddingBottom: 18,
  },
  carousel: {
    width: "100%",
    resizeMode: "center",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
    marginLeft: "5%",
    textAlignVertical: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000000",
    borderBottomWidth: 0.5,
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  checkerItem: {
    flexDirection: "row",
    marginTop: 9,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    paddingVertical: 7,
    minHeight: 52,
  },
  form_container: {
    paddingBottom: "20%",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
