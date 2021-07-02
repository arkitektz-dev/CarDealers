import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MyDemandListing from "./Listing";

const MyDemand = () => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      <MyDemandListing />
    </View>
  );
};
export default MyDemand;
const styles = StyleSheet.create({
  Parent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
});
