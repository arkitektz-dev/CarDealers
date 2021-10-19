import React, { memo } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import ListingDealer from "./Listing";

const DealerScreen = (data) => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      <ListingDealer data={data} />
    </View>
  );
};
export default memo(DealerScreen);
