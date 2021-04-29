import React from "react";
import Car from "../../Assets/Car.png";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import { useNavigation } from "@react-navigation/core";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Card = () => {
  // console.log(carData[0]);
  // carData[0].forEach((element) => {
  //   console.log(element.data(), "Map");
  // });
  // const data = cardata;

  // cardata.forEach((element) => {
  //   console.log(element);
  // });
  const data = [
    {
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",

      image: Car,
    },
    {
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",

      image: Car,
    },
    {
      name: "Toyota Corolla",
      model: 2018,
      amount: "PKR 26.0 Lacs",
      city: "Karachi",
      milage: "23,000KM",
      engineType: "petrol",

      image: Car,
    },
    {
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
    navigation.navigate("DetailCarScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View style={{ justifyContent: "space-between", left: "10%" }}>
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, flexDirection: "column", alignContent: "center" }}>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={_renderItem}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
  },
});
