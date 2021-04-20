import React from "react";
import { StyleSheet, View } from "react-native";

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: "column",
  },
});

export default ListItemSeparator;
