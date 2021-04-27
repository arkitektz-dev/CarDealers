import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShowroomScreen from "../../Screens/Showroom";
import DetailScreen from "../../Screens/Showroom/Details";
import ListingShowroom from "../../Screens/Showroom/Listing";

const ShowroomStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ShowScreen" component={ShowroomScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="ListingScreen" component={ListingShowroom} />
    </Stack.Navigator>
  );
};
export default ShowroomStack;
