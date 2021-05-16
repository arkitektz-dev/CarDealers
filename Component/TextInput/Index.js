import React from "react";
import { HelperText, TextInput } from "react-native-paper";

const AppTextInput = ({ onChangeHandler, keyboardType, label, multiline }) => {
  return (
    <>
      <TextInput
        renderToHardwareTextureAndroid
        returnKeyType="next"
        placeholderTextColor="#333"
        mode="flat"
        keyboardType={keyboardType}
        multiline={multiline}
        label={label}
        underlineColor="#333"
        underlineColorAndroid="#333"
        theme={{
          colors: {
            primary: "#333",
            placeholder: "#333",
            text: "#333",
          },
        }}
        style={{
          backgroundColor: "transparent",
          color: "#333",
        }}
        onChangeText={onChangeHandler}
      />
    </>
  );
};
export default AppTextInput;
