import React from "react";
import { Checkbox } from "react-native-paper";

const AppCheckBox = ({ status, onPress }) => {
  return (
    <Checkbox
      color="red"
      status={status}
      uncheckedColor={"red"}
      onPress={onPress}
    />
  );
};
export default AppCheckBox;
