import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CarScreen from "../../Screens/Car";

const CarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="CarScreen" component={CarScreen} />
    </Stack.Navigator>
  );
};
export default CarStack;
