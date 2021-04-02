import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../Screens/HomeScreen/Index";

const HomeIndexStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default HomeIndexStack;
