import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryCard = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const imageHeight = screenHeight * 0;
  const imageWidth = screenWidth * 0.3;
  const data = [
    {
      image:
        "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    },
    {
      image:
        "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ height: imageHeight, width: imageWidth, borderRadius: 10 }}
      >
        <View style={{ backgroundColor: "red" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 90, height: 90 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList data={data} renderItem={_renderItem} horizontal={true} />
    </>
  );
};

export default CategoryCard;
