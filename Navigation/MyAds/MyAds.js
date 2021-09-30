import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAds from "../../Screens/MyAd/Listing";
import DetailCarScreen from "../../Screens/MyAd/Details";
import DemandTabs from "../TopTab";
import Listing from "../../Screens/MyAd/Listing";


const MyAdStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Ads."
        component={Listing}
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
