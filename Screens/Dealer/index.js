import React from "react";
import {Text} from "react-native";
import {View} from "react-native";
import ListingDealer from "./Listing";

const DealerScreen = () => {
  return (
    <View style={{flex: 1, flexDirection: "column", backgroundColor: "#fff"}}>
      <ListingDealer />
    </View>
  );
};
export default DealerScreen;
