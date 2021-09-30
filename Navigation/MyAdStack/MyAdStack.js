import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAds from "../../Screens/MyAd/Listing";
import DetailCarScreen from "../../Screens/MyAd/Details";
import DemandTabs from "../TopTab";


const MyAdStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DemandTabs"
        component={DemandTabs}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="DetailCarScreen"
        component={DetailCarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default MyAdStack;
