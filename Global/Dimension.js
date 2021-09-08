import React from "react";
import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const autoCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const imageChecker = (image) => {
  console.log("checkeing");
  if (image?.includes("file:/")) {
    return image;
  } else if (image === undefined || image === "" || image === null) {
    console.log(2);
    return "https://cdn5.vectorstock.com/i/1000x1000/93/09/car-salesman-cartoon-vector-17209309.jpg";
  } else if (
    !image?.includes("file:/") &&
    image !== undefined &&
    !image?.includes("https://platform")
  ) {
    let img = image.split(" ").join("%20");

    return img;
  }
};
