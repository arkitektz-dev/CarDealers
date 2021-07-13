import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyDemand from "../../Screens/MyDemands";
import MyAds from "../../Screens/MyAd";
const Tab = createMaterialTopTabNavigator();

function DemandTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Ads" component={MyAds} />
      <Tab.Screen name="My Demands" component={MyDemand} />
    </Tab.Navigator>
  );
}
export default DemandTabs;
