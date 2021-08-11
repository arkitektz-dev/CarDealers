import React, { useState } from "react";
import { View } from "react-native";
import MyDemand from "../../Screens/MyDemands";
import MyAds from "../../Screens/MyAd";
import { TouchableOpacity } from "react-native";

function DemandTabs() {
  const [swipeEnabled, setSwipeEnabled] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TouchableOpacity onPress={() => setSwipeEnabled(true)}>
          <Text>My Ads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSwipeEnabled(false)}>
          <Text>My Demands</Text>
        </TouchableOpacity>
      </View>
      {swipeEnabled ? <MyAds /> : <MyDemand />}
    </View>
  );
}
export default DemandTabs;
