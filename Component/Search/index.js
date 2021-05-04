import React from "react";
import {StyleSheet} from "react-native";
import {Image} from "react-native";
import {View} from "react-native";
import {Searchbar} from "react-native-paper";

import BellIcon from "../../Assets/BellIcon.png";

export const SearchComponent = ({image, style}) => {
  return (
    <View style={styles.search}>
      <Searchbar placeholder="Search By Keyword" style={style} />
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
