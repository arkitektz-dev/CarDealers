import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import ImageSlider from "react-native-image-slider";
import Icon from "react-native-vector-icons/Feather";
import Drawer from "../../Assets/Drawer.png";
import { screenHeight } from "../../Global/Dimension";
import { fetchSpecificDealer } from "../../Data/FetchData";

const DetailCarScreen = ({ route, navigation }) => {
  const item = route.params.item;
  const [images, setImages] = useState(item.images);
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
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "red",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
        <Text
          style={{
            color: "grey",
            fontWeight: "bold",
            fontSize: 22,
            alignItems: "center",
            textAlignVertical: "center",
          }}
        >
          PROFILE
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={Drawer}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
              alignSelf: "flex-end",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageHolder}>
        <ImageSlider
          style={styles.carousel}
          loop={true}
          loopBothSides
          autoPlayWithInterval={3000}
          images={images}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {item.vehicle.information.make} {item.vehicle.information.model}{" "}
          {item.vehicle.information.modelYear}
        </Text>
        <Text style={styles.location}> {item.vehicle.city} </Text>
      </View>
      <ScrollView>
        <View style={styles.detailView}>
          <View style={styles.CarInfoTitle}>
            <Text style={styles.carInfoText}>Car Information</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.subDataRow}>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Model Year</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.information.modelYear}
                  </Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Transmission</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.additionalInformation.transmission}
                  </Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Capacity</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.additionalInformation.engineCapacity}
                  </Text>
                </View>
              </View>

              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Assembly</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.additionalInformation.assembly}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.subDataRow}>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Milage</Text>
                  <Text style={styles.txt1}>{item.vehicle.mileage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Type</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.additionalInformation.engineType}
                  </Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Registration City</Text>
                  <Text style={styles.txt1}>
                    {item.vehicle.registrationCity}
                  </Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Exterior Color</Text>
                  <Text style={styles.txt1}>{item.vehicle.exteriorColor}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "grey",
                borderRadius: 50,
                width: 40,
                height: 40,
              }}
            >
              <Icon
                style={{ top: 5, left: 5 }}
                name="phone-call"
                size={25}
                color="black"
                onPress={makeCall}
              />
            </View>
            <TouchableOpacity
              style={styles.CarInfoTitle}
              onPress={() => navigation.navigate("")}
            >
              <Text style={styles.carInfoText}>Call Dealer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailCarScreen;
const styles = StyleSheet.create({
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
    // justifyContent: "space-around",
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
    backgroundColor: "red",
    width: "50%",
    justifyContent: "center",
    borderRadius: 10,
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
  imageHolder: {
    alignSelf: "center",
    height: 200,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  container: {
    flex: 1,
    // backgroundColor: "green",
  },
  titleContainer: {
    margin: 10,
    borderBottomWidth: 0.4,
    opacity: 2,
    shadowColor: "grey",
    shadowOpacity: 2,
  },
  carousel: {
    width: "97%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
