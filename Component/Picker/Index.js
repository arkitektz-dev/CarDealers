import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { screenWidth } from "../../Global/Dimension";

const AppPicker = ({ options, placeholder, multipleSelect,onChangeHandler }) => {
  return (
    <ModalDropdown
    multipleSelect={multipleSelect}
      options={options}
      style={styles.Picker}
      animated={true}
      scrollEnabled={true}
      isFullWidth={true}
      defaultValue={placeholder}
      textStyle={{ fontSize: 15 }}
      dropdownStyle={styles.dropdown}
      onSelect={onChangeHandler}
      dropdownTextStyle={{ fontSize: 15 }}
      dropdownTextHighlightStyle={{color:'#007bff'}}

      
    />
  );
};
const styles = StyleSheet.create({
 
  Picker: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f8f4f4",
    alignItems: "center",
    alignSelf: "center",
    width:screenWidth * 0.5,
    justifyContent:'center'
  },
  dropdown: {
    borderRadius: 20,
    backgroundColor: "#f8f4f4",
    width:screenWidth * 0.5,
    
    
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: "grey",
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize:20
  },
});

export default AppPicker;
