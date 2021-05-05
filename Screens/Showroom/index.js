import React from "react";
import {Text} from "react-native";
import {View} from "react-native";
import ListingShowroom from "./Listing";

const ShowroomScreen = () => {
  return (
    <View style={{flex: 1, flexDirection: "column", backgroundColor: "#fff"}}>
      <ListingShowroom />
    </View>
  );
};
export default ShowroomScreen;
