import React from "react";
import Car from "../../Assets/Car.png";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";

const Card = () => {
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
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={{ justifyContent: "space-between", left: "10%" }}>
          <Image
            source={item.image}
            style={{ width: 100, height: 100 }}
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
