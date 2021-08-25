import React from "react";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

const Checkbox = ({ checkedState, key, title, onPress }) => {
  return (
    <CheckBox
      key={key}
      onPress={onPress}
      center
      title={title}
      iconRight
      iconType="material"
      checkedIcon="check-circle"
      uncheckedIcon="add"
      checkedColor="green"
      checked={checkedState}
    />
  );
};
export default Checkbox;
