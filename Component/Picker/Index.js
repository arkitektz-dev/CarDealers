import React, { useState } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native";

import { ModalSelectList } from "react-native-modal-select-list";
import { StyleSheet } from "react-native";

const AppPicker = ({
  options,
  placeholder,
  multipleSelect,
  keyExtractor,
  onChangeHandler,
}) => {
  let modalRef;

  const openModal = () => modalRef.show();
  const saveModalRef = (ref) => (modalRef = ref);
  const items = ["1000 Km", "2000 Km"];
  const onSelectedOption = (value) => {
    console.log(`You selected: ${value}`);
  };
  return (
    // <ModalDropdown
    // multipleSelect={multipleSelect}
    //   options={options}
    //   style={styles.Picker}
    //   animated={true}
    //   scrollEnabled={true}
    //   isFullWidth={true}
    //   defaultValue={placeholder}
    //   textStyle={{ fontSize: 15 }}
    //   dropdownStyle={styles.dropdown}
    //   onSelect={onChangeHandler}
    //   dropdownTextStyle={{ fontSize: 15 }}
    //   dropdownTextHighlightStyle={{color:'#007bff'}}

    // />

    <>
      <SafeAreaView style={styles.container}>
        <Button title="Open Modal" onPress={openModal} />
      </SafeAreaView>
      <ModalSelectList
        placeholder={"Text something..."}
        ref={saveModalRef}
        closeButtonText={"Close"}
        options={items}
        onSelectedOption={onSelectedOption}
        disableTextSearch={false}
      />
    </>
  );
};
const styles = StyleSheet.create({
  // Picker: {
  //   borderRadius: 25,
  //   flexDirection: "row",
  //   padding: 15,
  //   marginVertical: 10,
  //   backgroundColor: "#f8f4f4",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   width: screenWidth * 0.5,
  //   justifyContent: "center",
  // },

  container: {
    backgroundColor: "#fff",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: "#333",
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
