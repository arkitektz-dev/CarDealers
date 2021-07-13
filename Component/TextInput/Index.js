import React from "react";
import { ActivityIndicator } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const AppTextInput = ({
  onChangeHandler,
  keyboardType,
  placeholder,
  label,
  multiline,
  returnKeyType,
  maxLength,
}) => {
  return (
    <>
      <TextInput
        maxLength={maxLength}
        placeholder={placeholder}
        renderToHardwareTextureAndroid
        returnKeyType={returnKeyType}
        placeholderTextColor="#000000"
        mode="flat"
        keyboardType={keyboardType}
        multiline={multiline}
        label={label}
        underlineColor="#000000"
        underlineColorAndroid="#000000"
        theme={{
          colors: {
            primary: "#000000",
            placeholder: "#000000",
            text: "#000000",
          },
        }}
        style={{
          backgroundColor: "transparent",
          color: "#000000",
        }}
        onChangeText={onChangeHandler}
      />
    </>
  );
};
export default AppTextInput;
