import React from "react";
import { StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

const ErrorHandle = ({ text }) => {
  return <HelperText type="error">{text}</HelperText>;
};

export default ErrorHandle;
const styles = StyleSheet.create({
  text: {
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
});
