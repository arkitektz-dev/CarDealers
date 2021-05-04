import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ShowroomScreen from "../../Screens/Showroom";
import ListingShowroom from "../../Screens/Showroom/Listing";
import ShowroomDetailScreen from "../../Screens/Showroom/Details";

const ShowroomStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShowScreen"
        component={ShowroomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ShowroomDetailScreen"
        component={ShowroomDetailScreen}
      />
      <Stack.Screen
        name="ListingScreen"
        component={ListingShowroom}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default ShowroomStack;
