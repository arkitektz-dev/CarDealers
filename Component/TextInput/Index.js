import React from "react";
import { HelperText, TextInput } from "react-native-paper";

const AppTextInput = ({
  onChangeHandler,
  keyboardType,
  placeholder,
  label,
  multiline,
  returnKeyType,
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        renderToHardwareTextureAndroid
        returnKeyType={returnKeyType}
        placeholderTextColor="#000"
        mode="flat"
        keyboardType={keyboardType}
        multiline={multiline}
        label={label}
        underlineColor="#000"
        underlineColorAndroid="#000"
        theme={{
          colors: {
            primary: "#000",
            placeholder: "#000",
            text: "#000",
          },
        }}
        style={{
          backgroundColor: "transparent",
          color: "#000",
          
        }}
        onChangeText={onChangeHandler}
      />
    </>
  );
};
export default AppTextInput;
