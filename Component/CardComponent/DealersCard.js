import React from "react";
import Dealer from "../../Assets/Dealer.png";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const DealerCard = () => {
  const data = [
    {
      address: "03102324123",
      image: Dealer,
    },
    {
      address: "03002354122",

      image: Dealer,
    },
    {
      address: "0329421012",

      image: Dealer,
    },
    {
      address: "03451234567",

      image: Dealer,
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
              width: screenWidth * 0.3,
              textAlign: "left",
              color: "#565656",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, flexDirection: "column", alignContent: "center" }}>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        renderItem={_renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DealerCard;
