import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShowroomScreen from "../../Screens/Showroom";

const ShowroomStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ShowScreen" component={ShowroomScreen} />
    </Stack.Navigator>
  );
};
export default ShowroomStack;
