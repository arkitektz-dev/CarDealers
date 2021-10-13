import React from "react";
import { HelperText, TextInput } from "react-native-paper";

const AppTextInput = ({
  onChangeHandler,
  keyboardType,
  placeholder,
  label,
  multiline,
  returnKeyType,
  value,
  maxLength,
  numberOfLines
}) => {
  return (
    <>
      <TextInput
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        renderToHardwareTextureAndroid
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        placeholderTextColor="#000000"
        mode="outlined"
        theme={{
          colors: {
            primary: "#1B3661",
            placeholder: "grey",
            text: "black",
          },
        }}
        dense="20"
        outlineColor="#CCCCCC"
        style={{ backgroundColor: "white",marginTop:10 ,width:'100%'}}
        multiline={multiline}
        label={label}
        onChangeText={onChangeHandler}
        numberOfLines={numberOfLines}
      />
    </>
  );
};
export default AppTextInput;
