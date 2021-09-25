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
        margin: 5,
        borderColor: "#b3b5b8",
        borderWidth: 1,
        shadowColor: "#470000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
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
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "left",
            color: "#1e2d64",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#1e2d64",
            fontSize: 14,
            fontWeight: "700",
            textAlign: "left",
          }}
        >
          {price}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "#1e2d64",
            fontSize: 13,
            fontWeight: "600",
          }}
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
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
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
