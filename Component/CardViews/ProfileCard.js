import React from "react";
import { ImageBackground } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import Loading from "../../Assets/loading.png";

const HomeCard = ({ image, sold, title, price, subtitle, pressHandler }) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        backgroundColor: "white",
        borderColor: "#ACAFB3",
        borderWidth: 0.5,
        height: 190,
        width: "46%",
        marginVertical: 10,
      }}
    >
      <TouchableOpacity onPress={pressHandler}>
        <ImageBackground
          source={image}
          style={styles.imageSize}
          resizeMode={"cover"}
          defaultSource={Loading}
        >
          <Image
            source={sold}
            resizeMode={"contain"}
            style={{ alignSelf: "flex-start", width: 70, height: 50 }}
          />
        </ImageBackground>
      </TouchableOpacity>
      <View style={{ padding: 12 }}>
        <Text
          style={{
            textAlign: "left",
            color: "#5B6380",
            fontSize: 16,
            fontFamily: "Roboto-Bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontFamily: "Roboto-Bold",
            textAlign: "left",
          }}
        >
          PKR {price}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "#ACAFB3",
            fontSize: 13,
            fontFamily: "Roboto-Medium",
            width: "100%",
          }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};
export default HomeCard;
const styles = StyleSheet.create({
  imageSize: {
    width: "100%",
    height: 110,
  },
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
});
