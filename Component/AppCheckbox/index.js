import React from "react";
import { Checkbox } from "react-native-paper";

const AppCheckBox = ({ status, onPress }) => {
  return (
    <Checkbox
      color="#1e2d64"
      status={status}
      uncheckedColor={"#1e2d64"}
      onPress={onPress}
    />
  );
};
export default AppCheckBox;
