import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HomeCard = ({image, title,price, subtitle, pressHandler}) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View
        style={{
          justifyContent: "space-between",
          backgroundColor: "white",
          margin: 5,
          borderRadius: 20,
          shadowColor: "#470000",
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          elevation: 2,
        }}
      >
        <Image source={image} style={styles.imageSize} resizeMode={"contain"} />
        <View style={{padding: 10}}>
          <Text
            style={{
              textAlign: "left",
              color: "#565656",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
           
            {title}
          </Text>
          <Text
              style={{
                color: "red",
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
             

              {price}
            </Text>
          <Text
            style={{
              textAlign: "left",
              color: "#565656",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
           
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
