import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppText style={styles.label}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#000000",
    borderBottomWidth: 0.2,
    width: "100%",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 15,
    margin: 15,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
  },
});

export default CategoryPickerItem;
