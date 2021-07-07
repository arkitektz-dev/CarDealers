import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ title, style, onPressHandler }) => {
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.5}
      onPress={onPressHandler}
    >
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
