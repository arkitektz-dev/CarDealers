import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

const AppPicker = ({ options, placeholder, onChangeHandler }) => {
  return (
    <ModalDropdown
      options={options}
      style={styles.Picker}
      animated={true}
      isFullWidth={true}
      defaultValue={placeholder}
      textStyle={{ fontSize: 15 }}
      dropdownStyle={styles.dropdown}
      onSelect={onChangeHandler}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  Picker: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f8f4f4",
    alignItems: "center",
    alignSelf: "center",
  },
  dropdown: {
    borderRadius: 20,
    backgroundColor: "#f8f4f4",
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
  },
});

export default AppPicker;
