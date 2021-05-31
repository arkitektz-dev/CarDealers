import React, { memo, useEffect, useState } from "react";
import Drawer from "../../Assets/Drawer.png";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/HomeProductListCard";

const ShowroomDetailScreen = ({ route }) => {
  const item = route.params.item;
  const showroomId = route.params.item.id;
  const [dealerCount, setdealerCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const arr = [];

  const fetchData = async () => {
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let showroomDataId;
        if (typeof documentSnapshot.data().showroom.id == "string") {
          showroomDataId = documentSnapshot.data().showroom.id.split("/")[1];
        } else {
          showroomDataId = documentSnapshot
            .data()
            .showroom.id.id.toString()
            .trim();
        }
        const paramShowroomId = showroomId.toString();
        if (showroomDataId == paramShowroomId)
          arr.push(documentSnapshot.data());
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };
  const fetchShowroomData = async () => {
    let dealersCount = 0;
    const ref = firestore().collection("Dealers");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        var a = documentSnapshot.data().showrooms.filter((s) => {
          if (s.id.id.trim() == showroomId) {
            return true;
          }
        });
        if (a.length > 0) {
          dealersCount++;
        }
      });
      setdealerCount(dealersCount);
    });
  };

  useEffect(() => {
    fetchShowroomData();
    fetchData();
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <HomeCard
        pressHandler={() => onPressHandler(item)}
        title={`${
          item.vehicle.information.make +
          " " +
          item.vehicle.information.model +
          " " +
          item.vehicle.information.modelYear
        } `}
        price={`${item.amount}`}
        subtitle={`${
          item.vehicle.city +
          " " +
          item.vehicle.mileage +
          " " +
          item.vehicle.additionalInformation.engineType
        } `}
        image={{ uri: item.images[0] }}
      />
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
      <View style={styles.distance}></View>
      <View style={styles.topDiv}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            marginHorizontal: 25,
          }}
        >
          <Image
            source={{ uri: item.images[0] }}
            onPress={() => navigation.goBack()}
            style={{
              width: 85,
              height: 85,
              borderRadius: 85 / 2,
            }}
          />
          <View style={{ width: 15 }}></View>
          <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <View style={styles.DealerName}>
              <Text style={styles.carInfoText}> {item.name} </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.h1}>{item.contactInformation}</Text>
              <Text style={styles.txt1}>{item.location}</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ flexDirection: "column" }}>
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
        <View style={{ flexDirection: "column" }}>
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
        contentContainerStyle={{
          alignSelf: "center",
        }}
        numColumns={2}
        data={dataCar}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default memo(ShowroomDetailScreen);
const styles = StyleSheet.create({
  Nav: { flexDirection: "row" },
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
    height: screenHeight * 0.15,
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  imageSize: {
    width: 130,
    height: 90,
    resizeMode: "contain",
  },
  h1: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  distance: {
    height: screenHeight * 0.035,
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
