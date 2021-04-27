import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import Car from "../../Assets/Car.png";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingShowroom = () => {
  const data = [
    {
      id: 1,
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",

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

      image: Car,
    },
  ];
  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
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
              {item.name + item.model}
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
                color: "#565656",
                fontSize: 10,
                fontWeight: "800",
                textAlign: "left",
              }}
            >
              {item.city} | {item.model} | {item.milage} | {item.engineType}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ListingShowroom;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
});