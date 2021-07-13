import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyDemand from "../Screens/DemandCarlisting/AddDemandCar";
import MyAds from "../Screens/Forms/AddCar";
const Tab = createMaterialTopTabNavigator();

function AddTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Ads" component={MyAds} />
      <Tab.Screen name="My Demands" component={MyDemand} />
    </Tab.Navigator>
  );
}
export default AddTabs;
