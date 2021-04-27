import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ListingCars from "./Listing";

const CarScreen = () => {
  return (
    <View>
      <ListingCars />
    </View>
  );
};
export default CarScreen;
const styles = StyleSheet.create({
  Parent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
});
