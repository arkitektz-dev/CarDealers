import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ title, style, onPressHandler, loading }) => {
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.5}
      onPress={onPressHandler}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
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
