import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyDemand from "../Screens/DemandCarlisting/AddDemandCar";
import MyAds from "../Screens/Forms/AddCar";
const Tab = createMaterialTopTabNavigator();

function AddTabs() {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen name="Ads" component={MyAds} />
      <Tab.Screen name="Demands" component={MyDemand} />
    </Tab.Navigator>
  );
}
export default AddTabs;
