import React, {Children} from "react";
import {StyleSheet, View} from "react-native";

const ScreenWrapper = () => {
  return <View style={styles.parent}></View>;
};
const styles = StyleSheet.create({
  parent: {
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",

    flex: 1,
    padding: 10,
  },
});
export default ScreenWrapper;
