import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Car from "../../Assets/CarImage.png";
import Dealer from "../../Assets/DealerImage.png";
import ShowRoom from "../../Assets/ShowroomImage.png";

const CategoryCard = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const imageHeight = screenHeight * 0;
  const imageWidth = screenWidth * 0.3;
  const naivgation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => naivgation.navigate("CarStack")}>
          <Image source={Car} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("DealerStack")}>
          <Image source={Dealer} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("ShowroomStack")}>
          <Image source={ShowRoom} style={{ width: 95, height: 95 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard;
