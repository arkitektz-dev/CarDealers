import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ListingCars from "./Listing";

const MyAd = (data) => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      <ListingCars data={data} />
    </View>
  );
};
export default MyAd;
const styles = StyleSheet.create({
  Parent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
});
