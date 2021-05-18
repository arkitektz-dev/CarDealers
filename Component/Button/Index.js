import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Button = ({ title, style, onPressHandler }) => {
  return (
    <TouchableOpacity style={style} onPress={onPressHandler}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
