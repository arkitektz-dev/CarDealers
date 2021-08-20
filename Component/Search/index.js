import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
export const SearchComponent = ({
  onSearchPress,
  image,
  style,
  onChangeHandler,
}) => {
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
      <TouchableOpacity
        onPress={onSearchPress}
        style={{
          left: 10,
          top: 12,
          backgroundColor: "#fff",
          width: 33,
          height: 33,
          borderRadius: 33 / 2,
        }}
      >
        <Feather
          style={{ alignSelf: "center", top: 7 }}
          color={"black"}
          name="search"
          size={17}
        />
      </TouchableOpacity>
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
