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
import BellIcon from "../../Assets/BellIcon.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ShowroomDetailScreen = ({route}) => {
  const item = route.params.item;
  const [dealerCount, setdealerCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const arr = [];
  const fetchData = async () => {
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        arr.push(documentSnapshot.data());
      });
      setDataCar(arr);
    });
  };

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
    fetchData();
  }, []);
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            borderRadius: 20,
            flexDirection: "column",
            margin: 5,
            left: 5,
          }}
        >
          <View>
            <Image
              source={{uri: item.images[0]}}
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
              {item.vehicle.information.make} {item.vehicle.information.model}{" "}
              {item.vehicle.information.modelYear}
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
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {item.vehicle.city} | {item.vehicle.mileage} | {""}
              {item.vehicle.additionalInformation.engineType}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation();

  return (
    <View style={styles.parent}>
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
      <View style={{flexDirection: "row"}}>
        <View style={styles.topDiv}>
          <View style={styles.DealerName}>
            <Text style={styles.carInfoText}> {item.name} </Text>
          </View>
          <View style={{flexDirection: "column"}}>
            <Text style={styles.h1}>{item.contactInformation}</Text>
            <Text style={styles.txt1}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={BellIcon}
            resizeMode="contain"
            style={{
              width: 52,
              height: 52,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{flexDirection: "column"}}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
            }}
          >
            {dealerCount}
          </Text>
          <TouchableOpacity style={styles.CarInfoTitle}>
            <Text style={styles.countText}> Dealers </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "column"}}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
            }}
          >
            {carCount}
          </Text>
          <View style={styles.CarInfoTitle}>
            <Text style={styles.countText}> Cars </Text>
          </View>
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={dataCar}
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
    width: screenWidth * 0.35,
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
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  DealerName: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  CarInfoTitle: {
    backgroundColor: "red",
    justifyContent: "center",
    width: screenWidth * 0.35,
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },
});
