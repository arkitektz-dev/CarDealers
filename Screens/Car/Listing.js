import React, {useEffect, useState} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/core";

import firestore from "@react-native-firebase/firestore";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingCars = () => {
  const navigation = useNavigation();
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
    fetchData();
  }, []);
  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", {item});
  };
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            flexDirection: "column",
            borderBottomWidth: 2,
            borderBottomColor: "#e0e0e0",
          }}
        >
          <View
            style={{
              left: "5%",
              flexDirection: "row",
            }}
          >
            <Image
              source={{uri: item.images[0]}}
              style={styles.imageSize}
              resizeMode={"contain"}
            />

            <View style={{flexDirection: "column", margin: 15}}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.vehicle.information.make +
                  item.vehicle.information.model +
                  item.vehicle.information.modelYear}
              </Text>
              <View style={{height: 10}}></View>
              {/* <Text
                style={{
                  textAlign: "left",
                  color: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.amount}
              </Text> */}
              <View style={{height: 10}}></View>

              <Text
                style={{
                  color: "#565656",
                  fontSize: 14,
                  fontWeight: "800",
                  textAlign: "left",
                }}
              >
                {item.vehicle.city} | {item.vehicle.mileage} |
                {item.vehicle.additionalInformation.engineType}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: "white"}}>
      <FlatList
        data={dataCar}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ListingCars;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.2,
  },
});
