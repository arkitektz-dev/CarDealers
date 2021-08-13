import React from "react";
import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const autoCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
