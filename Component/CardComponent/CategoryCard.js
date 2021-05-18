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
import { screenHeight, screenWidth } from "../../Global/Dimension";

const CategoryCard = () => {
 
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
  container: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
    height: 100,
    padding: 5,
    margin: 5,
    justifyContent: "center",
    overflow: "hidden",
    width: screenWidth * 0.3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default CategoryCard;
