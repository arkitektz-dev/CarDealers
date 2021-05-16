import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

export const Button = ({ title, style, onPressHandler }) => {
  return (
    <TouchableOpacity style={style} onPress={onPressHandler}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    alignSelf: "center",
    backgroundColor: "red",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
