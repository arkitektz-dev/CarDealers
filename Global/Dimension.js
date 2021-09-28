import React from "react";
import { Dimensions } from "react-native";
import moment from "moment";
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

//email
export const emailValidation = (email) => {
  let result;
  var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  if (email?.length === 0 || email === undefined) {
    result = "Email is required";
  } else if (re.test(email.trim()) === false) {
    result = "Invalid Email";
  }
  return result;
};
export const defineDate = (value) => {
  if (
    value != null &&
    value != undefined &&
    value != "" &&
    value != 0 &&
    value != "0"
  ) {
   
    var momentObj = moment(value.toDate());
    var momentString = momentObj.format("DD MMM YYYY"); // 2016-07-15
    return momentString;
  } else return " - ";
};

export const defineValue = value => {
  if (
    value != null &&
    value != undefined &&
    value != '' &&
    value != 0 &&
    value != '0'
  ) {
    return value;
  } else return ' - ';
};


export const defineValuePrice = value => {
  if (
    value != null &&
    value != undefined &&
    value != '' &&
    value != 0 &&
    value != '0'
  ) {
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else return ' - ';
};