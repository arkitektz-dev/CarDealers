import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyDemand from "../../Screens/MyDemands";
import MyAds from "../../Screens/MyAd";
const Tab = createMaterialTopTabNavigator();

function DemandTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyAd" component={MyAds} />
      <Tab.Screen name="MyDemand" component={MyDemand} />
    </Tab.Navigator>
  );
}
export default DemandTabs;
