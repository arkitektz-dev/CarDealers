import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyDemand from "../Screens/DemandCarlisting/AddDemandCar";
import AddCarStack from "../Navigation/AddCarStack/AddStack";
const Tab = createMaterialTopTabNavigator();

function AddTabs() {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen name="Ads" component={AddCarStack} />
      <Tab.Screen name="Demands" component={MyDemand} />
    </Tab.Navigator>
  );
}
export default AddTabs;
