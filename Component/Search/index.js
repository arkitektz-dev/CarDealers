import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
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
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: 60,
          height: 60,
          bottom: "2.5%",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
