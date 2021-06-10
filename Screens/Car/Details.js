import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import { Button } from "../../Component/Button/Index";

import Calendar from "../../Assets/NewAsset/Calendar.png";
import Speedometer from "../../Assets/NewAsset/Speedometer.png";
import Petrol from "../../Assets/NewAsset/Petrol.png";
import Arrow from "../../Assets/NewAsset/Arrow.png";
import CallSeller from "../../Assets/NewAsset/CallSeller.png";
import ImageSlider from "react-native-image-slider";
import { screenHeight } from "../../Global/Dimension";
import { fetchSpecificDealer } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import { BottomSheet } from "react-native-elements/dist/bottomSheet/BottomSheet";
const DetailCarScreen = ({ route, navigation }) => {
  const item = route.params.item;
  const [images, setImages] = useState(item.images);
  const [isVisible, setIsVisible] = useState(false);
  const [dealerData, setDealerData] = useState();
  const dealerId = item.dealer.id.id;

  useEffect(() => {
    fetchSpecificDealer(dealerId).then((data) => setDealerData(data.data()));
  }, []);

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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1e2d64",
          marginBottom: 2,
        }}
      >
        <IonIcon
          style={{ margin: 5 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={31}
          onPress={() => navigation.goBack()}
        />
      </View>
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
        <Text style={styles.location}>{item.amount} </Text>
        <Text style={styles.location}> {item.vehicle.city} </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.detailView}>
          <View style={styles.CarInfoTitle}>
            <View style={{ flexDirection: "column" }}>
              <Image source={Calendar} style={styles.img} />
              <Text style={{ color: "#000000", fontWeight: "bold" }}>
                {item.vehicle.information.modelYear}
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Image source={Speedometer} style={styles.img} />
              <Text style={{ color: "#000000", fontWeight: "bold" }}>
                {item.vehicle.mileage}
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Image source={Petrol} style={styles.img} />
              <Text style={{ color: "#000000", fontWeight: "bold" }}>
                {item.vehicle.additionalInformation.engineType}
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Image source={Arrow} style={styles.img} />
              <Text style={{ color: "#000000", fontWeight: "bold" }}>
                {item.vehicle.additionalInformation.transmission}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.subDataRow}>
              <View style={styles.propertyBorder}>
                <Text style={styles.text}>Registration City</Text>
                <Text style={styles.text2}>
                  {item.vehicle.registrationCity}
                </Text>
              </View>
              <View style={styles.otherData}>
                <Text style={styles.text}>Exterior Color</Text>
                <Text style={styles.text2}>{item.vehicle.exteriorColor}</Text>
              </View>
              <View style={styles.otherData}>
                <Text style={styles.text}> Assembly </Text>
                <Text style={styles.text2}>
                  {item.vehicle.additionalInformation.assembly}
                </Text>
              </View>
              <View style={styles.otherData}>
                <Text style={styles.text}>Engine Capacity</Text>
                <Text style={styles.text2}>
                  {item.vehicle.additionalInformation.engineCapacity}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              margin: 20,
              fontSize: 21,
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Features
          </Text>
          {/* {item.vehicle.additionalInformation.features.map((item) => (
            <View style={{ flexDirection: "column", flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={Radio} style={styles.img} />
                <Text>{item}</Text>
              </View>
            </View>
          ))} */}
          <Text
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
              borderColor: "#333",
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
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet
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
      </BottomSheet>
    </View>
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
  dealerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    margin: 15,
    width: "100%",
    textAlign: "center",
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
    width: 30,
    height: 30,
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
    flex: 1,
  },
  detailView: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 24,
  },
  location: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageSize: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#A9A9A9",
    fontWeight: "bold",
    fontSize: 18,
    textAlignVertical: "center",
  },
  propertyBorder: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    width: "90%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#333",
    justifyContent: "space-between",
    marginTop: 10,
    textAlign: "right",
  },
  otherData: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    width: "90%",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  text2: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 18,
    margin: 15,
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
    overflow: "hidden",
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    margin: 10,
    borderBottomWidth: 0.4,
    opacity: 2,
    shadowColor: "grey",
    shadowOpacity: 2,
  },
  carousel: {
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
