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
import Profile from "../../Assets/RedProfileLogo.png";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/HomeProductListCard";

const DealerDetailScreen = ({ route }) => {
  const param = route.params.item;

  const [showroomCount, setshowroomCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const fetchData = async () => {
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let dealerId;
        if (typeof documentSnapshot.data().dealer.id == "string") {
          dealerId = documentSnapshot.data().dealer.id.split("/")[1];
        } else {
          dealerId = documentSnapshot.data().dealer.id.id.toString().trim();
        }

        const paramdealerId = param.id.toString();
        if (dealerId == paramdealerId) {
          arr.push(documentSnapshot.data());
        }
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };

  useEffect(() => {
    setshowroomCount(param.showrooms.length);
    fetchData();
  }, []);

  const arr = [];

  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };

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
            source={Profile}
            style={{
              width: 85,
              height: 85,
            }}
          />
          <View style={{ width: 15 }}></View>
          <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <View style={styles.DealerName}>
              <Text style={styles.carInfoText}>
                {"\b"}

                {param.name}
                {" \b"}
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              {param.showrooms.map((item) => {
                return <Text style={styles.h1}>{item.name}</Text>;
              })}

              <Text style={styles.txt1}>{param.contactInformation[0]}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 20 }}></View>
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
            {showroomCount}
          </Text>
          <TouchableOpacity style={styles.CarInfoTitle}>
            <Text style={styles.countText}> SHOWROOMS </Text>
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
            <Text style={styles.countText}> CARS </Text>
          </View>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ alignSelf: "center" }}
        numColumns={2}
        data={dataCar}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default memo(DealerDetailScreen);
const styles = StyleSheet.create({
  Nav: { flexDirection: "row" },
  distance: {
    height: screenHeight * 0.035,
  },
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
    flexDirection: "column",
    bottom: "1%",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
  h1: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt1: {
    color: "grey",
    fontSize: 13,
    fontWeight: "bold",
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },
  countText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  DealerName: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  CarInfoTitle: {
    backgroundColor: "red",
    justifyContent: "center",
    width: screenWidth * 0.35,
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
});
