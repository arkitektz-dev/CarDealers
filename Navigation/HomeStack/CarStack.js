import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CarScreen from "../../Screens/Car";
import DetailCarScreen from "../../Screens/Car/Details";

const CarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CarScreen"
        component={CarScreen}
        options={{ headerTitleAlign: "center", title: "Car" }}
      />
      <Stack.Screen
        name="DetailCarScreen"
        component={DetailCarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default CarStack;
