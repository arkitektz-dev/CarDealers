import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const DetailScreen = ({ route }) => {
  const item = route.params.item;
  return (
    <View>
      <Image source={item.image} style={styles.imageSize} />
    </View>
  );
};
export default DetailScreen;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
});
