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
const ListingCars = () => {
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

  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "column",
            borderBottomWidth: 2,
            height: "15%",
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
              source={item.image}
              style={styles.imageSize}
              resizeMode={"contain"}
            />

            <View style={{ flexDirection: "column", margin: 15 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.name + item.model}
              </Text>
              <View style={{ height: 10 }}></View>
              <Text
                style={{
                  textAlign: "left",
                  color: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.amount}
              </Text>
              <View style={{ height: 10 }}></View>

              <Text
                style={{
                  color: "#565656",
                  fontSize: 14,
                  fontWeight: "800",
                  textAlign: "left",
                }}
              >
                {item.city} | {item.model}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={data}
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
