import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import BellIcon from "../../Assets/BellIcon.png";

export const SearchComponent = () => {
  return (
    <View style={styles.search}>
      <Searchbar style={{ width: "75%", borderRadius: 20, maxHeight: "80%" }} />
      <Image
        source={BellIcon}
        resizeMode="contain"
        style={{
          width: 60,
          height: 60,
          opacity: 1,
          shadowOpacity: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
