import React from "react";
import MyDemandListing from "../../Screens/MyDemands/Listing";
import MyAd from "../../Screens/MyAd";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function DemandTabs() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="My Ads" component={MyAd} />
      <Tab.Screen name="My Demands" component={MyDemandListing} />
    </Tab.Navigator>
  );
}
export default DemandTabs;
