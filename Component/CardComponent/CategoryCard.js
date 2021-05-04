import {useNavigation} from "@react-navigation/core";
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
    <View style={{flexDirection: "row"}}>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => naivgation.navigate("CarStack")}>
          <View style={styles.container}>
            <Image source={Car} style={styles.image} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => naivgation.navigate("DealerStack")}>
          <View style={styles.container}>
            <Image source={Dealer} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("ShowroomStack")}>
          <View style={styles.container}>
            <Image source={ShowRoom} style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {},
  container: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 110,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default CategoryCard;
