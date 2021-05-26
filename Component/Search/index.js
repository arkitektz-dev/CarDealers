import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

export const SearchComponent = ({ image, style, onChangeHandler }) => {
  return (
    <View style={styles.search}>
      <Searchbar
        placeholder="Search By Keyword"
        style={style}
        inputStyle={{ fontSize: 13 }}
        onChangeText={onChangeHandler}
        autoCorrect={false}
        underlineColorAndroid="white"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    width: "90%",
    paddingLeft: 10,
  },
});
