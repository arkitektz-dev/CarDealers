import React, { useState } from "react";
import { View } from "react-native";
import MyDemand from "../../Screens/MyDemands";
import MyAds from "../../Screens/MyAd";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

function DemandTabs() {
  const [swipeEnabled, setSwipeEnabled] = useState(false);

  return <MyDemand />;
}
export default DemandTabs;
