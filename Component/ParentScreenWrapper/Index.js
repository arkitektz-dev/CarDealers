import React, {Children} from "react";
import {StyleSheet, View} from "react-native";

const ScreenWrapper = () => {
  return <View style={styles.parent}></View>;
};
const styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
export default ScreenWrapper;
