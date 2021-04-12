import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Card = () => {
  const data = [
    {
      title: "test",
      location: "test1",
      image:
        "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    },
    {
      title: "test",
      location: "test1",
      image:
        "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.title}</Text>
          <Text>{item.location}</Text>
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

export default Card;
