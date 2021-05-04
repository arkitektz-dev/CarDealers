import React, {useEffect, useState} from "react";
import Drawer from "../../Assets/Drawer.png";

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Car from "../../Assets/Car.png";
import {useNavigation} from "@react-navigation/core";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ShowroomDetailScreen = ({route}) => {
  const item = route.params.item;
  const [dealerCount, setdealerCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  // const [data, setData] = useState();

  useEffect(() => {
    firestore()
      .collection("Dealers")
      .get()
      .then((querySnapshot) => {
        setdealerCount(querySnapshot.size);
      });
    firestore()
      .collection("Advertisments")
      .get()
      .then((querySnapshot) => {
        setcarCount(querySnapshot.size);
      });
  }, []);

  const data = [
    {
      id: 1,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",
      image: Car,
    },
    {
      id: 2,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",
      image: Car,
    },
    {
      id: 3,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",
      image: Car,
    },
    {
      id: 4,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",

      image: Car,
    },
    {
      id: 5,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",

      image: Car,
    },
    {
      id: 6,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",
      image: Car,
    },
    {
      id: 7,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",
      Transmission: "Auto",
      image: Car,
    },
  ];
  const navigation = useNavigation();
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            margin: 5,
            backgroundColor: "white",
            borderRadius: 20,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              left: "5%",
            }}
          >
            <Image
              source={item.image}
              style={styles.imageSize}
              resizeMode={"contain"}
            />
            <Text
              style={{
                textAlign: "left",
                color: "#565656",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "red",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.amount}
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "#565656",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.milage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.parent}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <Text
          style={{
            color: "grey",
            fontWeight: "bold",
            fontSize: 22,
            alignItems: "center",
            textAlignVertical: "center",
          }}
        >
          Profile
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
      <View style={styles.topDiv}>
        <View style={styles.CarInfoTitle}>
          <Text style={styles.carInfoText}> {item.name} </Text>
        </View>
        <View style={{flexDirection: "column"}}>
          <Text style={styles.h1}>{item.contactInformation}</Text>
          <Text style={styles.txt1}>{item.location}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{flexDirection: "column"}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
            }}
          >
            {dealerCount}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListingDealer")}
            style={styles.CarInfoTitle}
          >
            <Text style={styles.countText}> Dealers </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "column"}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
            }}
          >
            {carCount}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListCarScreen")}
            style={styles.CarInfoTitle}
          >
            <Text style={styles.countText}> Cars </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ShowroomDetailScreen;
const styles = StyleSheet.create({
  Nav: {flexDirection: "row"},
  parent: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  navTxt: {
    textAlign: "center",
    alignItems: "center",
    color: "grey",
    fontSize: 23,
    fontWeight: "bold",
  },
  topDiv: {
    width: screenWidth,
    height: screenHeight * 0.2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
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
  carInfoText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  CarInfoTitle: {
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
    textAlign: "center",
  },
});
